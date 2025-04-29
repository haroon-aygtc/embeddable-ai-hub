import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";

import {
  MessageSquare,
  Palette,
  Settings,
  Sliders,
  Image,
  Bell,
  FolderOpen,
  PlusCircle
} from "lucide-react";
import WidgetPreview from "./WidgetPreview";

const WidgetBuilder = () => {
  // Widget settings state
  const [primaryColor, setPrimaryColor] = useState("#4a4dd4");
  const [secondaryColor, setSecondaryColor] = useState("#6370e1");
  const [title, setTitle] = useState("AI Chat Assistant");
  const [subtitle, setSubtitle] = useState("We typically reply in a few minutes");
  const [welcomeMessage, setWelcomeMessage] = useState("Hello! 👋 How can I help you today?");
  const [botName, setBotName] = useState("AI Assistant");
  const [position, setPosition] = useState("bottom-right");
  const [avatar, setAvatar] = useState("");
  const [size, setSize] = useState(60);
  const [showBranding, setShowBranding] = useState(true);
  
  // Tab state
  const [activeTab, setActiveTab] = useState("appearance");

  // Widget template presets
  const applyTemplate = (template: string) => {
    switch(template) {
      case "modern":
        setPrimaryColor("#4a4dd4");
        setSecondaryColor("#6370e1");
        break;
      case "glass":
        setPrimaryColor("#209fb5");
        setSecondaryColor("#30b8d0");
        break;
      case "dark":
        setPrimaryColor("#1e293b");
        setSecondaryColor("#334155");
        break;
      case "soft":
        setPrimaryColor("#ec4899");
        setSecondaryColor("#f472b6");
        break;
      case "minimal":
        setPrimaryColor("#18181b");
        setSecondaryColor("#27272a");
        break;
    }
  };

  // Generate embed code
  const generateEmbedCode = () => {
    return `<script src="https://ai-chat-widget.example.com/widget.js" 
      data-primary-color="${primaryColor}"
      data-secondary-color="${secondaryColor}"
      data-title="${title}"
      data-subtitle="${subtitle}"
      data-welcome-message="${welcomeMessage}"
      data-bot-name="${botName}"
      data-position="${position}"
      data-size="${size}"
      data-show-branding="${showBranding}"
    ></script>`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Builder Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Template Selection */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Widget Templates</h3>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                onClick={() => applyTemplate("modern")}
                className="flex flex-col items-center p-4 h-auto"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-600 mb-2"></div>
                <span>Modern Clean</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => applyTemplate("glass")}
                className="flex flex-col items-center p-4 h-auto"
              >
                <div className="h-8 w-8 rounded-full bg-cyan-500 mb-2"></div>
                <span>Glass Effect</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => applyTemplate("dark")}
                className="flex flex-col items-center p-4 h-auto"
              >
                <div className="h-8 w-8 rounded-full bg-slate-800 mb-2"></div>
                <span>Dark Mode</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => applyTemplate("soft")}
                className="flex flex-col items-center p-4 h-auto"
              >
                <div className="h-8 w-8 rounded-full bg-pink-500 mb-2"></div>
                <span>Soft Rounded</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => applyTemplate("minimal")}
                className="flex flex-col items-center p-4 h-auto"
              >
                <div className="h-8 w-8 rounded-full bg-zinc-800 mb-2"></div>
                <span>Minimalist</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Configuration Tabs */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="appearance">
              <Palette className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="content">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="behavior">
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Behavior</span>
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <Sliders className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Advanced</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-lg font-medium">Colors</h3>
                  <p className="text-sm text-muted-foreground">Customize the colors of your widget.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex space-x-2">
                      <div 
                        className="h-9 w-9 rounded-md border" 
                        style={{backgroundColor: primaryColor}}
                      ></div>
                      <Input 
                        id="primaryColor"
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex space-x-2">
                      <div 
                        className="h-9 w-9 rounded-md border" 
                        style={{backgroundColor: secondaryColor}}
                      ></div>
                      <Input 
                        id="secondaryColor"
                        type="text"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-1.5">
                  <h3 className="text-lg font-medium">Position & Size</h3>
                  <p className="text-sm text-muted-foreground">Control where and how large your widget appears.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Widget Position</Label>
                    <RadioGroup 
                      defaultValue={position}
                      onValueChange={setPosition}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bottom-right" id="bottom-right" />
                        <Label htmlFor="bottom-right">Bottom Right</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bottom-left" id="bottom-left" />
                        <Label htmlFor="bottom-left">Bottom Left</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="top-right" id="top-right" />
                        <Label htmlFor="top-right">Top Right</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="top-left" id="top-left" />
                        <Label htmlFor="top-left">Top Left</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="size">Button Size: {size}px</Label>
                    </div>
                    <Slider 
                      id="size" 
                      min={40} 
                      max={80} 
                      step={1}
                      value={[size]} 
                      onValueChange={(values) => setSize(values[0])} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showBranding">Show "Powered by" branding</Label>
                    <p className="text-[0.8rem] text-muted-foreground">
                      Display a subtle "Powered by AI Chat Hub" in the widget
                    </p>
                  </div>
                  <Switch 
                    id="showBranding"
                    checked={showBranding}
                    onCheckedChange={setShowBranding}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-lg font-medium">Widget Content</h3>
                  <p className="text-sm text-muted-foreground">Customize the text and messages in your widget.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Widget Title</Label>
                    <Input 
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Widget Subtitle</Label>
                    <Input 
                      id="subtitle"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="botName">Bot Name</Label>
                    <Input 
                      id="botName"
                      value={botName}
                      onChange={(e) => setBotName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="welcomeMessage">Welcome Message</Label>
                    <Textarea 
                      id="welcomeMessage"
                      value={welcomeMessage}
                      onChange={(e) => setWelcomeMessage(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Bot Avatar</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        {avatar ? (
                          <img src={avatar} alt="Bot avatar" className="h-full w-full rounded-full object-cover" />
                        ) : (
                          <MessageSquare className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Button variant="outline" className="w-full">
                          <Image className="h-4 w-4 mr-2" />
                          Upload Avatar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Pre-chat Form</Label>
                    <Switch />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Collect visitor information before starting the chat
                  </p>
                  
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Name</p>
                        <p className="text-sm text-muted-foreground">Required</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">Required</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">Optional</p>
                      </div>
                      <Switch />
                    </div>
                    <Button variant="outline" size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Custom Field
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="behavior" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-lg font-medium">Auto-open Settings</h3>
                  <p className="text-sm text-muted-foreground">Control when the chat widget automatically opens.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-open on page load</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically open the widget when the page loads
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="delay">Time delay (seconds)</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="delay" 
                        min={1} 
                        max={30} 
                        step={1}
                        defaultValue={[5]} 
                        disabled
                      />
                      <span className="w-12 text-right">5s</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="scrollPercentage">Scroll percentage</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="scrollPercentage" 
                        min={10} 
                        max={100} 
                        step={5}
                        defaultValue={[50]} 
                        disabled
                      />
                      <span className="w-12 text-right">50%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Exit intent</p>
                      <p className="text-sm text-muted-foreground">
                        Open when user is about to leave the page
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-1.5">
                  <h3 className="text-lg font-medium">Notification Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure chat notifications and sounds.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sound notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Play sound when receiving messages
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Browser notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Show browser notifications for new messages
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Bubble notification badge</p>
                      <p className="text-sm text-muted-foreground">
                        Show a badge on the chat button for new messages
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-lg font-medium">Embed Code</h3>
                  <p className="text-sm text-muted-foreground">Copy and paste this code into your website.</p>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Textarea 
                      rows={6} 
                      readOnly 
                      value={generateEmbedCode()}
                      className="font-mono text-sm"
                    />
                    <Button 
                      className="absolute top-2 right-2" 
                      size="sm" 
                      onClick={() => navigator.clipboard.writeText(generateEmbedCode())}
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This code should be added just before the closing &lt;/body&gt; tag.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-1.5">
                  <h3 className="text-lg font-medium">Additional Settings</h3>
                  <p className="text-sm text-muted-foreground">Advanced configuration options.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mobile optimization</p>
                      <p className="text-sm text-muted-foreground">
                        Optimize widget for mobile devices
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Persistent sessions</p>
                      <p className="text-sm text-muted-foreground">
                        Save chat history between sessions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">GDPR compliance notice</p>
                      <p className="text-sm text-muted-foreground">
                        Show data usage consent message
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Preview Panel */}
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border">
            <h3 className="text-lg font-medium mb-3">Live Preview</h3>
            <div className="border rounded-lg bg-white dark:bg-slate-800 aspect-[9/16] relative overflow-hidden">
              <div className="absolute inset-0">
                <WidgetPreview 
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  title={title}
                  subtitle={subtitle}
                  welcomeMessage={welcomeMessage}
                  botName={botName}
                  avatar={avatar}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetBuilder;
