
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Brain, 
  Settings, 
  TestTube, 
  BarChart3, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Zap
} from "lucide-react";
import { AIModel, AIModelFormValues } from "./types/aiTypes";
import { AIModelForm } from "./AIModelForm";

interface AIModelConfigWizardProps {
  model?: AIModel;
  onSave: (data: AIModelFormValues & { capabilities: string[] }) => void;
  onCancel: () => void;
}

export const AIModelConfigWizard = ({ 
  model, 
  onSave, 
  onCancel 
}: AIModelConfigWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<AIModelFormValues>>({});

  const steps = [
    {
      id: "basic",
      title: "Basic Information",
      description: "Set up the fundamental details of your AI model",
      icon: Brain,
      component: "basic"
    },
    {
      id: "config",
      title: "Configuration",
      description: "Configure technical parameters and settings",
      icon: Settings,
      component: "config"
    },
    {
      id: "test",
      title: "Test & Validate",
      description: "Test your model configuration to ensure it works",
      icon: TestTube,
      component: "test"
    },
    {
      id: "finalize",
      title: "Review & Deploy",
      description: "Review your settings and deploy the model",
      icon: CheckCircle,
      component: "review"
    }
  ];

  const currentStepData = steps[currentStep];
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

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

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              onClick={() => handleStepClick(index)}
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
                Let's start with the basic information about your AI model. This includes
                the model name, provider, and general description.
              </p>
              {/* Basic form fields would go here */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quick Setup</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">GPT-4</Button>
                    <Button variant="outline" size="sm">Claude</Button>
                    <Button variant="outline" size="sm">Gemini</Button>
                    <Button variant="outline" size="sm">Custom</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Configure the technical parameters for your model including API settings,
                tokens, temperature, and other advanced options.
              </p>
              <Tabs defaultValue="api" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="api">API Settings</TabsTrigger>
                  <TabsTrigger value="params">Parameters</TabsTrigger>
                  <TabsTrigger value="limits">Rate Limits</TabsTrigger>
                </TabsList>
                <TabsContent value="api" className="space-y-4">
                  {/* API configuration */}
                </TabsContent>
                <TabsContent value="params" className="space-y-4">
                  {/* Parameter configuration */}
                </TabsContent>
                <TabsContent value="limits" className="space-y-4">
                  {/* Rate limit configuration */}
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Test your model configuration to ensure everything is working correctly
                before deploying it to production.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="gap-2 h-auto py-4">
                  <Zap className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Quick Test</div>
                    <div className="text-xs opacity-80">Basic functionality test</div>
                  </div>
                </Button>
                <Button variant="outline" className="gap-2 h-auto py-4">
                  <TestTube className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Full Benchmark</div>
                    <div className="text-xs text-muted-foreground">Comprehensive testing</div>
                  </div>
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Review your configuration and deploy your AI model. You can always
                come back and modify these settings later.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Configuration Summary</h4>
                <div className="space-y-1 text-sm">
                  <div>Model: <span className="font-medium">GPT-4</span></div>
                  <div>Provider: <span className="font-medium">OpenAI</span></div>
                  <div>Status: <span className="font-medium">Ready to deploy</span></div>
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
              
              {currentStep === steps.length - 1 ? (
                <Button onClick={() => onSave({} as any)} className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Deploy Model
                </Button>
              ) : (
                <Button onClick={handleNext} className="gap-2">
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
