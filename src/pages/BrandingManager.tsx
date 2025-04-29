
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Palette, Save, Upload, HelpCircle, Brush, MessageSquare, FileCode } from "lucide-react";

const BrandingManager = () => {
  const [activeTab, setActiveTab] = useState("visual");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Branding Manager</h1>
          <p className="text-muted-foreground">
            Customize the look, feel, and voice of your AI chat system
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs defaultValue="visual" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visual">Visual Style</TabsTrigger>
          <TabsTrigger value="voice">Brand Voice</TabsTrigger>
          <TabsTrigger value="messaging">Messaging</TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visual Identity</CardTitle>
              <CardDescription>
                Customize colors, logos, and visual elements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Brand Logo</label>
                    <div className="mt-2 border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:bg-accent">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Upload your brand logo (SVG, PNG, or JPG)
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Recommended size: 240×80px
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Favicon</label>
                    <div className="mt-2 border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:bg-accent">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Upload your favicon (SVG or PNG)
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Recommended size: 32×32px
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Primary Color</label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Main brand color for buttons and accents</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <div className="w-10 h-10 rounded border border-input overflow-hidden">
                        <input 
                          type="color" 
                          value="#9b87f5" 
                          className="w-full h-full cursor-pointer" 
                        />
                      </div>
                      <Input value="#9b87f5" className="flex-1" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Secondary Color</label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Support color for secondary elements</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <div className="w-10 h-10 rounded border border-input overflow-hidden">
                        <input 
                          type="color" 
                          value="#7E69AB" 
                          className="w-full h-full cursor-pointer" 
                        />
                      </div>
                      <Input value="#7E69AB" className="flex-1" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Font Family</label>
                    <Select defaultValue="inter">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select font family" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="open-sans">Open Sans</SelectItem>
                        <SelectItem value="lato">Lato</SelectItem>
                        <SelectItem value="montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Border Radius</label>
                    <Select defaultValue="rounded">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select corner style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sharp">Sharp (0px)</SelectItem>
                        <SelectItem value="slightly">Slightly Rounded (4px)</SelectItem>
                        <SelectItem value="rounded">Rounded (8px)</SelectItem>
                        <SelectItem value="pill">Pill (16px)</SelectItem>
                        <SelectItem value="circular">Circular (999px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visual Themes</CardTitle>
              <CardDescription>
                Choose from predefined themes or customize your own
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                  <div className="h-20 mb-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded"></div>
                  <p className="font-medium">Modern Purple</p>
                  <p className="text-xs text-muted-foreground">Clean, professional look</p>
                </div>

                <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                  <div className="h-20 mb-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded"></div>
                  <p className="font-medium">Corporate Blue</p>
                  <p className="text-xs text-muted-foreground">Professional, trustworthy</p>
                </div>

                <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                  <div className="h-20 mb-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded"></div>
                  <p className="font-medium">Eco Green</p>
                  <p className="text-xs text-muted-foreground">Fresh, sustainable feel</p>
                </div>

                <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                  <div className="h-20 mb-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded"></div>
                  <p className="font-medium">Warm Orange</p>
                  <p className="text-xs text-muted-foreground">Energetic, friendly vibe</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline">
                <Brush className="mr-2 h-4 w-4" /> Create Custom Theme
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Voice & Tone</CardTitle>
              <CardDescription>
                Define how your AI communicates with users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Personality</label>
                    <Select defaultValue="friendly">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select personality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly & Approachable</SelectItem>
                        <SelectItem value="professional">Professional & Formal</SelectItem>
                        <SelectItem value="casual">Casual & Conversational</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic & Energetic</SelectItem>
                        <SelectItem value="technical">Technical & Precise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Formality Level</label>
                    <Select defaultValue="balanced">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select formality level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-formal">Very Formal</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="very-casual">Very Casual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Communication Style</label>
                    <Select defaultValue="clear">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select communication style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clear">Clear & Direct</SelectItem>
                        <SelectItem value="detailed">Detailed & Thorough</SelectItem>
                        <SelectItem value="concise">Concise & Brief</SelectItem>
                        <SelectItem value="empathetic">Empathetic & Supportive</SelectItem>
                        <SelectItem value="witty">Witty & Clever</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">First-Person Pronouns</label>
                    <Select defaultValue="i-we">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select pronoun style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="i-we">I/We (first-person)</SelectItem>
                        <SelectItem value="company-name">[Company Name] (third-person)</SelectItem>
                        <SelectItem value="no-pronouns">Avoid first-person pronouns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Vocabulary Level</label>
                    <Select defaultValue="moderate">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select vocabulary level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">Simple & Accessible</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="advanced">Advanced & Sophisticated</SelectItem>
                        <SelectItem value="technical">Technical & Industry-Specific</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Response Length</label>
                    <Select defaultValue="balanced">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select response length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-brief">Very Brief</SelectItem>
                        <SelectItem value="brief">Brief</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Custom Voice Instructions</label>
                <Textarea 
                  className="mt-2"
                  placeholder="Add specific voice and tone instructions that will guide the AI's communication style..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brand Voice Examples</CardTitle>
              <CardDescription>
                Preview and test your brand voice with example scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Sample Greeting</label>
                <div className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">Hi there! 👋 I'm your AI assistant from Acme Inc. How can I help you today? I'm here to answer questions about our products, help with troubleshooting, or provide any information you might need.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Product Information</label>
                <div className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">Our Premium Plan includes all the features of the Basic Plan, plus advanced analytics, priority support, and unlimited exports. It's perfect for growing businesses that need more powerful tools and dedicated assistance. Would you like me to tell you more about the pricing or specific features?</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messaging" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Standard Messages</CardTitle>
              <CardDescription>
                Customize the default messages shown in different scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Welcome Message</label>
                    <Textarea 
                      className="mt-2"
                      placeholder="Initial message when the chat first opens..."
                      defaultValue="Hi there! 👋 Welcome to our chat. How can I help you today?"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Away Message</label>
                    <Textarea 
                      className="mt-2"
                      placeholder="Message shown when outside business hours or offline..."
                      defaultValue="We're currently away, but we'll get back to you as soon as we're online again. Please leave a message."
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Input Placeholder</label>
                    <Input 
                      className="mt-2"
                      placeholder="Text shown in the input field..."
                      defaultValue="Type your message here..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Fallback Message</label>
                    <Textarea 
                      className="mt-2"
                      placeholder="Message shown when the AI can't answer..."
                      defaultValue="I'm not sure I understand that question. Could you please rephrase it or provide more details?"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Connection Error</label>
                    <Textarea 
                      className="mt-2"
                      placeholder="Message shown when there are connection issues..."
                      defaultValue="Oops! We're having trouble connecting. Please check your internet connection and try again."
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Send Button Text</label>
                    <Input 
                      className="mt-2"
                      placeholder="Text or icon description for the send button..."
                      defaultValue="Send"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legal Text & Disclaimers</CardTitle>
              <CardDescription>
                Set up necessary legal messages and disclaimers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Privacy Notice</label>
                  <Textarea 
                    className="mt-2"
                    placeholder="Privacy information shown to users..."
                    defaultValue="This chat may collect and store your messages to improve our service. By using this chat, you agree to our Privacy Policy."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Terms & Conditions</label>
                  <Textarea 
                    className="mt-2"
                    placeholder="Terms users must agree to..."
                    defaultValue="By using this chat assistant, you agree to our Terms of Service. Please do not share sensitive personal information."
                    rows={3}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">AI Disclosure Message</label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Legally required in some jurisdictions to disclose AI usage</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Textarea 
                    className="mt-2"
                    placeholder="Disclosure about AI usage..."
                    defaultValue="I am an AI assistant and my responses are generated by artificial intelligence technology."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandingManager;
