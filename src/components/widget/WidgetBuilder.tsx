import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Palette, 
  Type, 
  MessageSquare, 
  Settings,
  Copy,
  Sliders,
  Image,
  Bell,
  FolderOpen,
  PlusCircle
} from "lucide-react";
import WidgetPreview from "./WidgetPreview";

// Template presets
const TEMPLATES = [
  { 
    name: "Modern Clean", 
    primaryColor: "#4a4dd4", 
    secondaryColor: "#6370e1",
    position: "bottom-right"
  },
  { 
    name: "Glass Effect", 
    primaryColor: "#3683D6", 
    secondaryColor: "#36B9D6",
    position: "bottom-left"
  },
  { 
    name: "Dark Mode", 
    primaryColor: "#333333", 
    secondaryColor: "#555555",
    position: "bottom-right"
  },
  { 
    name: "Soft Rounded", 
    primaryColor: "#7E69AB", 
    secondaryColor: "#9b87f5",
    position: "top-right"
  },
  { 
    name: "Minimalist", 
    primaryColor: "#000000", 
    secondaryColor: "#333333",
    position: "bottom-right"
  },
];

const WidgetBuilder = () => {
  const [widgetConfig, setWidgetConfig] = useState({
    primaryColor: "#4a4dd4",
    secondaryColor: "#6370e1",
    title: "AI Chat Assistant",
    subtitle: "We typically reply in a few minutes",
    welcomeMessage: "Hello! 👋 How can I help you today?",
    botName: "AI Assistant",
    avatar: "",
    position: "bottom-right",
    font: "system",
    chatBubbleStyle: "rounded",
    autoOpen: false,
    autoOpenDelay: 5,
    autoOpenScrollPercent: 50,
    enableNotifications: true,
    enableSounds: false,
    inputPlaceholder: "Type your message here...",
    offlineMessage: "We're currently offline. Please leave a message and we'll get back to you soon.",
    darkMode: false,
  });
  
  const handleChange = (field: string, value: string | boolean | number) => {
    setWidgetConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const applyTemplate = (index: number) => {
    const template = TEMPLATES[index];
    setWidgetConfig((prev) => ({
      ...prev,
      primaryColor: template.primaryColor,
      secondaryColor: template.secondaryColor,
      position: template.position,
    }));
    toast.success(`Applied "${template.name}" template!`);
  };
  
  const generateEmbedCode = () => {
    const code = `<!-- AI Chat Widget -->
<script>
  (function(w, d) {
    const script = d.createElement("script");
    script.src = "https://embed.aichat.example.com/widget.js";
    script.async = true;
    script.defer = true;
    script.setAttribute("data-widget-id", "YOUR_WIDGET_ID");
    script.setAttribute("data-primary-color", "${widgetConfig.primaryColor}");
    script.setAttribute("data-secondary-color", "${widgetConfig.secondaryColor}");
    script.setAttribute("data-position", "${widgetConfig.position}");
    script.setAttribute("data-title", "${widgetConfig.title}");
    script.setAttribute("data-dark-mode", "${widgetConfig.darkMode}");
    d.head.appendChild(script);
  })(window, document);
</script>`;

    navigator.clipboard.writeText(code).then(
      () => {
        toast.success("Embed code copied to clipboard!");
      },
      () => {
        toast.error("Failed to copy code. Please try again.");
      }
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="appearance">
              <TabsList className="mb-4">
                <TabsTrigger value="appearance" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="behavior" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Behavior
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="appearance" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Templates</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {TEMPLATES.map((template, index) => (
                      <div 
                        key={template.name}
                        className="border rounded-md p-2 text-center cursor-pointer hover:border-primary transition-all"
                        onClick={() => applyTemplate(index)}
                      >
                        <div 
                          className="w-full h-12 rounded-md mb-2"
                          style={{background: `linear-gradient(45deg, ${template.primaryColor}, ${template.secondaryColor})`}}
                        ></div>
                        <p className="text-xs">{template.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={widgetConfig.primaryColor}
                          onChange={(e) => handleChange("primaryColor", e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={widgetConfig.primaryColor}
                          onChange={(e) => handleChange("primaryColor", e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={widgetConfig.secondaryColor}
                          onChange={(e) => handleChange("secondaryColor", e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={widgetConfig.secondaryColor}
                          onChange={(e) => handleChange("secondaryColor", e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Position & Size</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Widget Position</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant={widgetConfig.position === "bottom-right" ? "default" : "outline"} 
                          className="justify-start"
                          onClick={() => handleChange("position", "bottom-right")}
                        >
                          Bottom Right
                        </Button>
                        <Button 
                          variant={widgetConfig.position === "bottom-left" ? "default" : "outline"} 
                          className="justify-start"
                          onClick={() => handleChange("position", "bottom-left")}
                        >
                          Bottom Left
                        </Button>
                        <Button 
                          variant={widgetConfig.position === "top-right" ? "default" : "outline"} 
                          className="justify-start"
                          onClick={() => handleChange("position", "top-right")}
                        >
                          Top Right
                        </Button>
                        <Button 
                          variant={widgetConfig.position === "top-left" ? "default" : "outline"} 
                          className="justify-start"
                          onClick={() => handleChange("position", "top-left")}
                        >
                          Top Left
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Appearance Mode</Label>
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <Label htmlFor="darkMode">Dark Mode</Label>
                        <Switch
                          id="darkMode"
                          checked={widgetConfig.darkMode === true}
                          onCheckedChange={(checked) => handleChange("darkMode", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Typography</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="font">Font Family</Label>
                      <Select 
                        value={widgetConfig.font} 
                        onValueChange={(value) => handleChange("font", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="system">System Default</SelectItem>
                          <SelectItem value="sans-serif">Sans Serif</SelectItem>
                          <SelectItem value="serif">Serif</SelectItem>
                          <SelectItem value="monospace">Monospace</SelectItem>
                          <SelectItem value="cursive">Cursive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="chatBubbleStyle">Chat Bubble Style</Label>
                      <Select 
                        value={widgetConfig.chatBubbleStyle} 
                        onValueChange={(value) => handleChange("chatBubbleStyle", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rounded">Rounded</SelectItem>
                          <SelectItem value="square">Square</SelectItem>
                          <SelectItem value="soft">Soft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Custom Logo</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="border-2 border-dashed p-6 rounded-md text-center">
                      <div className="mb-4 flex justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload your logo to display in the chat header
                      </p>
                      <Button variant="outline">
                        <FolderOpen className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="content" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Header</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Widget Title</Label>
                      <Input
                        id="title"
                        value={widgetConfig.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Chat Title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={widgetConfig.subtitle}
                        onChange={(e) => handleChange("subtitle", e.target.value)}
                        placeholder="We typically reply in a few minutes"
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Bot Configuration</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="botName">Bot Name</Label>
                      <Input
                        id="botName"
                        value={widgetConfig.botName}
                        onChange={(e) => handleChange("botName", e.target.value)}
                        placeholder="AI Assistant"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="welcomeMessage">Welcome Message</Label>
                      <Input
                        id="welcomeMessage"
                        value={widgetConfig.welcomeMessage}
                        onChange={(e) => handleChange("welcomeMessage", e.target.value)}
                        placeholder="Hello! How can I help you today?"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inputPlaceholder">Input Placeholder</Label>
                      <Input
                        id="inputPlaceholder"
                        value={widgetConfig.inputPlaceholder}
                        onChange={(e) => handleChange("inputPlaceholder", e.target.value)}
                        placeholder="Type your message here..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="offlineMessage">Offline Message</Label>
                      <Textarea
                        id="offlineMessage"
                        value={widgetConfig.offlineMessage}
                        onChange={(e) => handleChange("offlineMessage", e.target.value)}
                        placeholder="We're currently offline. Please leave a message and we'll get back to you soon."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Pre-Chat Form</h3>
                  <p className="text-sm text-muted-foreground">Configure form fields to collect information before starting the chat</p>
                  <div className="border rounded-md p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Full Name</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Email Address</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Phone Number</Label>
                        <Switch />
                      </div>
                      <Button variant="outline" size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Custom Field
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="behavior" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Auto-Open Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure when the chat widget should automatically open</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border p-3 rounded-md">
                      <div>
                        <Label className="font-medium">Auto-Open Chat</Label>
                        <p className="text-sm text-muted-foreground">Automatically open the chat widget</p>
                      </div>
                      <Switch
                        checked={widgetConfig.autoOpen === true}
                        onCheckedChange={(checked) => handleChange("autoOpen", checked)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="autoOpenDelay">Time Delay (seconds)</Label>
                        <Input
                          id="autoOpenDelay"
                          type="number"
                          min="0"
                          value={widgetConfig.autoOpenDelay}
                          onChange={(e) => handleChange("autoOpenDelay", parseInt(e.target.value))}
                          disabled={!widgetConfig.autoOpen}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="autoOpenScrollPercent">Scroll Percentage</Label>
                        <Input
                          id="autoOpenScrollPercent"
                          type="number"
                          min="0"
                          max="100"
                          value={widgetConfig.autoOpenScrollPercent}
                          onChange={(e) => handleChange("autoOpenScrollPercent", parseInt(e.target.value))}
                          disabled={!widgetConfig.autoOpen}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Settings</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between border p-3 rounded-md">
                      <div>
                        <Label className="font-medium">Enable Notifications</Label>
                        <p className="text-sm text-muted-foreground">Show notification when receiving new messages</p>
                      </div>
                      <Switch
                        checked={widgetConfig.enableNotifications === true}
                        onCheckedChange={(checked) => handleChange("enableNotifications", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between border p-3 rounded-md">
                      <div>
                        <Label className="font-medium">Enable Sound Effects</Label>
                        <p className="text-sm text-muted-foreground">Play sound when receiving new messages</p>
                      </div>
                      <Switch
                        checked={widgetConfig.enableSounds === true}
                        onCheckedChange={(checked) => handleChange("enableSounds", checked)}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Mobile Behavior</h3>
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Fullscreen on Mobile</Label>
                        <p className="text-sm text-muted-foreground">Open chat in fullscreen mode on mobile devices</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Hide on Small Screens</Label>
                        <p className="text-sm text-muted-foreground">Don't show widget on screens smaller than 320px</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">AI Model Selection</h3>
                  <p className="text-sm text-muted-foreground">Choose which AI model powers your chat widget</p>
                  
                  <div className="border rounded-md p-4 space-y-4">
                    <Select defaultValue="gemini-pro">
                      <SelectTrigger>
                        <SelectValue placeholder="Select AI model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                        <SelectItem value="huggingface">Hugging Face</SelectItem>
                        <SelectItem value="grok-1">Grok-1</SelectItem>
                        <SelectItem value="custom">Custom Model</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Knowledge Base</h3>
                  <p className="text-sm text-muted-foreground">Connect your knowledge base to enhance AI responses</p>
                  
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Use Knowledge Base</Label>
                        <p className="text-sm text-muted-foreground">Ground AI responses in your own content</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Knowledge Base Source</Label>
                      <Select defaultValue="kb-1">
                        <SelectTrigger>
                          <SelectValue placeholder="Select knowledge base" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kb-1">Product Documentation</SelectItem>
                          <SelectItem value="kb-2">FAQs</SelectItem>
                          <SelectItem value="kb-3">Support Articles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Embed Code</h3>
                  <p className="text-sm text-muted-foreground">Copy this code and paste it before the closing &lt;/body&gt; tag on your website.</p>
                  <div className="relative">
                    <pre className="bg-zinc-950 text-zinc-50 p-4 rounded-md text-sm overflow-x-auto">
                      {`<!-- AI Chat Widget -->
<script>
  (function(w, d) {
    const script = d.createElement("script");
    script.src = "https://embed.aichat.example.com/widget.js";
    script.async = true;
    script.defer = true;
    script.setAttribute("data-widget-id", "YOUR_WIDGET_ID");
    script.setAttribute("data-primary-color", "${widgetConfig.primaryColor}");
    script.setAttribute("data-secondary-color", "${widgetConfig.secondaryColor}");
    script.setAttribute("data-position", "${widgetConfig.position}");
    script.setAttribute("data-title", "${widgetConfig.title}");
    script.setAttribute("data-dark-mode", "${widgetConfig.darkMode}");
    d.head.appendChild(script);
  })(window, document);
</script>`}
                    </pre>
                    <Button 
                      size="icon" 
                      variant="secondary"
                      className="absolute top-2 right-2"
                      onClick={generateEmbedCode}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="default" onClick={generateEmbedCode} className="flex items-center gap-2">
                    <Copy className="h-4 w-4" />
                    Copy Embed Code
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Live Preview</h3>
              <p className="text-sm text-muted-foreground">See how your widget will appear on your website</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full max-w-sm">
                  <div className="relative h-full w-full flex items-end justify-end p-4">
                    <WidgetPreview
                      primaryColor={widgetConfig.primaryColor}
                      secondaryColor={widgetConfig.secondaryColor}
                      title={widgetConfig.title}
                      subtitle={widgetConfig.subtitle}
                      welcomeMessage={widgetConfig.welcomeMessage}
                      botName={widgetConfig.botName}
                      avatar={widgetConfig.avatar}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WidgetBuilder;
