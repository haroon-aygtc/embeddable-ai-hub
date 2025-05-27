import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Brain, 
  Settings, 
  TestTube, 
  BarChart3, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Zap,
  Key,
  MessageSquare,
  Send,
  Loader2
} from "lucide-react";
import { AIModel, AIModelFormValues } from "./types/aiTypes";
import { AIModelSelector } from "./AIModelSelector";
import { toast } from "sonner";

interface AIModelConfigWizardProps {
  model?: AIModel;
  onSave: (data: AIModelFormValues & { capabilities: string[] }) => void;
  onCancel: () => void;
}

// Mock provider data
const mockProviders = [
  {
    id: "openai",
    name: "OpenAI",
    description: "GPT models for chat and completion",
    icon: "🤖",
    requiresApiKey: true,
    baseUrl: "https://api.openai.com/v1"
  },
  {
    id: "anthropic",
    name: "Anthropic",
    description: "Claude models for helpful AI assistance",
    icon: "🧠",
    requiresApiKey: true,
    baseUrl: "https://api.anthropic.com/v1"
  },
  {
    id: "google",
    name: "Google",
    description: "Gemini models for multimodal AI",
    icon: "🔍",
    requiresApiKey: true,
    baseUrl: "https://generativelanguage.googleapis.com/v1"
  },
  {
    id: "meta",
    name: "Meta",
    description: "Llama models for open-source AI",
    icon: "🦙",
    requiresApiKey: false,
    baseUrl: "https://api.replicate.com/v1"
  }
];

// Enhanced mock models data with more realistic data
const mockModels: Record<string, any[]> = {
  openai: [
    { id: "gpt-4", name: "GPT-4", description: "Most capable model for complex tasks", maxTokens: 8192, type: "text-generation" },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo", description: "Latest GPT-4 with improved performance and larger context", maxTokens: 128000, type: "text-generation" },
    { id: "gpt-4-vision", name: "GPT-4 Vision", description: "GPT-4 with image understanding capabilities", maxTokens: 8192, type: "multimodal" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and efficient for most tasks", maxTokens: 4096, type: "text-generation" },
    { id: "gpt-3.5-turbo-16k", name: "GPT-3.5 Turbo 16K", description: "Extended context length version", maxTokens: 16384, type: "text-generation" }
  ],
  anthropic: [
    { id: "claude-3-opus", name: "Claude 3 Opus", description: "Most powerful Claude model for complex reasoning", maxTokens: 200000, type: "text-generation" },
    { id: "claude-3-sonnet", name: "Claude 3 Sonnet", description: "Balanced performance and speed", maxTokens: 200000, type: "text-generation" },
    { id: "claude-3-haiku", name: "Claude 3 Haiku", description: "Fast and lightweight for quick tasks", maxTokens: 200000, type: "text-generation" },
    { id: "claude-2.1", name: "Claude 2.1", description: "Previous generation with improved accuracy", maxTokens: 100000, type: "text-generation" },
    { id: "claude-2.0", name: "Claude 2.0", description: "Original Claude 2 model", maxTokens: 100000, type: "text-generation" }
  ],
  google: [
    { id: "gemini-pro", name: "Gemini Pro", description: "Advanced reasoning capabilities", maxTokens: 30720, type: "multimodal" },
    { id: "gemini-pro-vision", name: "Gemini Pro Vision", description: "Text and image understanding", maxTokens: 30720, type: "multimodal" },
    { id: "gemini-ultra", name: "Gemini Ultra", description: "Most capable model for complex tasks", maxTokens: 30720, type: "multimodal" }
  ],
  meta: [
    { id: "llama-2-70b", name: "Llama 2 70B", description: "Large open-source model", maxTokens: 4096, type: "text-generation" },
    { id: "llama-2-13b", name: "Llama 2 13B", description: "Medium open-source model", maxTokens: 4096, type: "text-generation" },
    { id: "llama-2-7b", name: "Llama 2 7B", description: "Smaller, faster open-source model", maxTokens: 4096, type: "text-generation" },
    { id: "code-llama-34b", name: "Code Llama 34B", description: "Specialized for code generation", maxTokens: 4096, type: "text-generation" },
    { id: "code-llama-13b", name: "Code Llama 13B", description: "Smaller code generation model", maxTokens: 4096, type: "text-generation" }
  ]
};

export const AIModelConfigWizard = ({ 
  model, 
  onSave, 
  onCancel 
}: AIModelConfigWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [availableModels, setAvailableModels] = useState<any[]>([]);
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [formData, setFormData] = useState<Partial<AIModelFormValues>>({
    name: "",
    description: "",
    temperature: 0.7,
    maxTokens: 4096,
    status: "testing"
  });
  
  // Test chat state
  const [testMessages, setTestMessages] = useState<Array<{role: string, content: string}>>([]);
  const [testInput, setTestInput] = useState("");
  const [isTesting, setIsTesting] = useState(false);

  const steps = [
    {
      id: "provider",
      title: "Select Provider",
      description: "Choose your AI model provider",
      icon: Brain
    },
    {
      id: "auth",
      title: "Authentication",
      description: "Configure API access",
      icon: Key
    },
    {
      id: "model",
      title: "Choose Model",
      description: "Select from available models",
      icon: Zap
    },
    {
      id: "config",
      title: "Configuration",
      description: "Configure model parameters",
      icon: Settings
    },
    {
      id: "test",
      title: "Test & Deploy",
      description: "Test your model and deploy",
      icon: TestTube
    }
  ];

  const currentStepData = steps[currentStep];
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  // Mock API call to fetch models
  const fetchModels = async (providerId: string, apiKey: string) => {
    setIsLoadingModels(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const models = mockModels[providerId] || [];
      setAvailableModels(models);
      toast.success(`Found ${models.length} models for ${selectedProvider}`);
    } catch (error) {
      toast.error("Failed to fetch models. Please check your API key.");
      setAvailableModels([]);
    } finally {
      setIsLoadingModels(false);
    }
  };

  // Handle provider selection
  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    setAvailableModels([]);
    setSelectedModel(null);
    
    const provider = mockProviders.find(p => p.id === providerId);
    if (provider) {
      setFormData(prev => ({
        ...prev,
        provider: provider.name,
        baseUrl: provider.baseUrl
      }));
    }
  };

  // Handle API key validation and model fetching
  const handleApiKeySubmit = () => {
    if (!selectedProvider) {
      toast.error("Please select a provider first");
      return;
    }
    
    const provider = mockProviders.find(p => p.id === selectedProvider);
    if (provider?.requiresApiKey && !apiKey.trim()) {
      toast.error("API key is required for this provider");
      return;
    }
    
    setFormData(prev => ({ ...prev, apiKey }));
    fetchModels(selectedProvider, apiKey);
    setCurrentStep(2);
  };

  // Handle model selection
  const handleModelSelect = (modelData: any) => {
    setSelectedModel(modelData);
    setFormData(prev => ({
      ...prev,
      name: modelData.name,
      description: modelData.description,
      modelType: modelData.type,
      maxTokens: modelData.maxTokens
    }));
  };

  // Mock test chat
  const handleTestMessage = async () => {
    if (!testInput.trim() || !selectedModel) return;
    
    setIsTesting(true);
    const userMessage = testInput;
    setTestInput("");
    
    setTestMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockResponse = `This is a test response from ${selectedModel.name}. In a real implementation, this would be the actual AI model response to: "${userMessage}"`;
    
    setTestMessages(prev => [...prev, { role: "assistant", content: mockResponse }]);
    setIsTesting(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalize = () => {
    if (!selectedModel || !formData.name) {
      toast.error("Please complete all required fields");
      return;
    }
    
    const finalData: AIModelFormValues & { capabilities: string[] } = {
      name: formData.name,
      provider: formData.provider || "",
      description: formData.description || "",
      apiKey: formData.apiKey,
      baseUrl: formData.baseUrl,
      modelType: formData.modelType || "text-generation",
      maxTokens: formData.maxTokens,
      temperature: formData.temperature,
      status: formData.status || "testing",
      capabilities: ["chat", "completion"]
    };
    
    onSave(finalData);
    toast.success("AI model configured successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {model ? `Configure ${model.name}` : "Add New AI Model"}
            </h2>
            <p className="text-muted-foreground">
              Follow the steps below to set up your AI model configuration
            </p>
          </div>
          <Badge variant="outline" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Step {currentStep + 1} of {steps.length}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{currentStepData.title}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <Card 
              key={step.id}
              className={`cursor-pointer transition-all ${
                isActive 
                  ? "ring-2 ring-primary bg-primary/5" 
                  : isCompleted 
                    ? "bg-green-50 border-green-200" 
                    : "hover:bg-muted/50"
              }`}
              onClick={() => index <= currentStep && setCurrentStep(index)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : isCompleted 
                        ? "bg-green-500 text-white" 
                        : "bg-muted"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${
                      isActive ? "text-primary" : ""
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <currentStepData.icon className="h-5 w-5" />
            {currentStepData.title}
          </CardTitle>
          <CardDescription>
            {currentStepData.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select your AI model provider to get started. Each provider offers different models and capabilities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockProviders.map((provider) => (
                  <Card 
                    key={provider.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedProvider === provider.id ? "ring-2 ring-primary bg-primary/5" : ""
                    }`}
                    onClick={() => handleProviderSelect(provider.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{provider.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{provider.name}</h3>
                          <p className="text-sm text-muted-foreground">{provider.description}</p>
                          {provider.requiresApiKey && (
                            <Badge variant="outline" className="mt-2">
                              Requires API Key
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Configure authentication for {mockProviders.find(p => p.id === selectedProvider)?.name}.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Your API key will be stored securely and used to authenticate requests.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {isLoadingModels ? "Fetching available models..." : "Select a model from the available options below."}
              </p>
              
              <AIModelSelector
                models={availableModels}
                selectedModel={selectedModel}
                onModelSelect={handleModelSelect}
                isLoading={isLoadingModels}
              />
            </div>
          )}

          {currentStep === 3 && selectedModel && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Configure the parameters for {selectedModel.name}.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modelName">Model Name</Label>
                  <Input
                    id="modelName"
                    value={formData.name || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter a name for this model"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input
                    id="temperature"
                    type="number"
                    min="0"
                    max="2"
                    step="0.1"
                    value={formData.temperature || 0.7}
                    onChange={(e) => setFormData(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxTokens">Max Tokens</Label>
                  <Input
                    id="maxTokens"
                    type="number"
                    value={formData.maxTokens || selectedModel.maxTokens}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status || "testing"}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="testing">Testing</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe how this model will be used"
                  rows={3}
                />
              </div>
            </div>
          )}

          {currentStep === 4 && selectedModel && (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Test your model configuration before deploying. Send a message to see how it responds.
              </p>
              
              {/* Test Chat Interface */}
              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-5 w-5" />
                  <span className="font-medium">Test Chat with {selectedModel.name}</span>
                </div>
                
                {/* Messages */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {testMessages.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">
                      Send a message to test the model
                    </p>
                  )}
                  {testMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isTesting && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-3 rounded-lg">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    placeholder="Type a test message..."
                    onKeyPress={(e) => e.key === "Enter" && handleTestMessage()}
                    disabled={isTesting}
                  />
                  <Button 
                    onClick={handleTestMessage} 
                    disabled={!testInput.trim() || isTesting}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Configuration Summary */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Configuration Summary</h4>
                <div className="space-y-1 text-sm">
                  <div>Provider: <span className="font-medium">{formData.provider}</span></div>
                  <div>Model: <span className="font-medium">{selectedModel.name}</span></div>
                  <div>Temperature: <span className="font-medium">{formData.temperature}</span></div>
                  <div>Max Tokens: <span className="font-medium">{formData.maxTokens}</span></div>
                  <div>Status: <span className="font-medium">{formData.status}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              
              {currentStep === 0 && selectedProvider && (
                <Button onClick={() => setCurrentStep(1)} className="gap-2">
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              
              {currentStep === 1 && (
                <Button onClick={handleApiKeySubmit} className="gap-2">
                  Fetch Models
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              
              {currentStep === 2 && selectedModel && (
                <Button onClick={handleNext} className="gap-2">
                  Configure
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              
              {currentStep === 3 && formData.name && (
                <Button onClick={handleNext} className="gap-2">
                  Test
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              
              {currentStep === 4 && (
                <Button onClick={handleFinalize} className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Deploy Model
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
