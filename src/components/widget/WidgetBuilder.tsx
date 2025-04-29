
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Palette, 
  Type, 
  MessageSquare, 
  Settings,
  Copy
} from "lucide-react";
import WidgetPreview from "./WidgetPreview";

const WidgetBuilder = () => {
  const [widgetConfig, setWidgetConfig] = useState({
    primaryColor: "#4a4dd4",
    secondaryColor: "#6370e1",
    title: "AI Chat Assistant",
    subtitle: "We typically reply in a few minutes",
    welcomeMessage: "Hello! 👋 How can I help you today?",
    botName: "AI Assistant",
    avatar: "",
  });
  
  const handleChange = (field: string, value: string) => {
    setWidgetConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
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
                        <Button variant="outline" className="justify-start">Bottom Right</Button>
                        <Button variant="outline" className="justify-start">Bottom Left</Button>
                        <Button variant="outline" className="justify-start">Top Right</Button>
                        <Button variant="outline" className="justify-start">Top Left</Button>
                      </div>
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
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="behavior" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Widget Behavior</h3>
                  <p className="text-muted-foreground">Configure how the chat widget behaves on your website.</p>
                  <div className="grid grid-cols-1 gap-4">
                    <Button variant="outline" className="justify-start w-full">
                      Auto Open Settings
                    </Button>
                    <Button variant="outline" className="justify-start w-full">
                      Notification Settings
                    </Button>
                    <Button variant="outline" className="justify-start w-full">
                      Mobile Behavior
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Embed Code</h3>
                  <p className="text-muted-foreground">Copy this code and paste it before the closing &lt;/body&gt; tag on your website.</p>
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
            
            <div className="flex-1 flex items-center justify-center bg-zinc-100 rounded-lg relative overflow-hidden">
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
