
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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Save, 
  ShieldCheck, 
  Globe, 
  HelpCircle, 
  Bell, 
  Download,
  Upload,
  FileJson,
  Clock,
  RotateCcw,
  Shield
} from "lucide-react";

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">
            Configure global system settings and preferences
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
          <TabsTrigger value="backups">Backups</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic system preferences and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">System Name</label>
                    <Input 
                      className="mt-2"
                      placeholder="Enter system name"
                      defaultValue="AI Chat Hub"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Admin Email Address</label>
                    <Input 
                      className="mt-2" 
                      type="email"
                      placeholder="admin@example.com"
                      defaultValue="admin@aichathub.com"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Default Chat Model</label>
                    <Select defaultValue="gemini">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select default AI model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gemini">Gemini Pro</SelectItem>
                        <SelectItem value="gpt">GPT-4</SelectItem>
                        <SelectItem value="claude">Claude 3</SelectItem>
                        <SelectItem value="custom">Custom Model</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Session Timeout</label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Time before inactive user sessions expire</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select defaultValue="60">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select session timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                        <SelectItem value="480">8 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Chat History Retention</label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>How long to keep chat history records</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select defaultValue="90">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="forever">Forever</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Rate Limiting</label>
                    <Select defaultValue="standard">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select rate limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Rate Limits</SelectItem>
                        <SelectItem value="light">Light (100 req/min)</SelectItem>
                        <SelectItem value="standard">Standard (50 req/min)</SelectItem>
                        <SelectItem value="strict">Strict (20 req/min)</SelectItem>
                        <SelectItem value="custom">Custom Configuration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">System Behavior</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable Analytics</label>
                    <p className="text-xs text-muted-foreground">Collect usage data for system improvements</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Allow Guest Chats</label>
                    <p className="text-xs text-muted-foreground">Enable chatting without user registration</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Auto Archive Inactive Chats</label>
                    <p className="text-xs text-muted-foreground">Automatically archive chats after 30 days of inactivity</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Send Email Notifications</label>
                    <p className="text-xs text-muted-foreground">Send notifications for important system events</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure authentication, access control, and security policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Password Policy</label>
                    <Select defaultValue="strong">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select password policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                        <SelectItem value="medium">Medium (8+ chars, numbers & letters)</SelectItem>
                        <SelectItem value="strong">Strong (10+ chars, numbers, letters, special)</SelectItem>
                        <SelectItem value="custom">Custom Policy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Two-Factor Authentication</label>
                    <Select defaultValue="optional">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select 2FA policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="optional">Optional (User Choice)</SelectItem>
                        <SelectItem value="admin-required">Required for Admins</SelectItem>
                        <SelectItem value="all-required">Required for All Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Login Attempt Limit</label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Maximum failed login attempts before lockout</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select defaultValue="5">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select attempt limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                        <SelectItem value="10">10 attempts</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Account Lockout Duration</label>
                    <Select defaultValue="30">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select lockout duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="24h">24 hours</SelectItem>
                        <SelectItem value="manual">Until Manual Reset</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">API Authentication Method</label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Method used to authenticate API requests</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Select defaultValue="jwt">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select API auth method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="api-key">API Keys</SelectItem>
                        <SelectItem value="jwt">JWT Tokens</SelectItem>
                        <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Session Security</label>
                    <Select defaultValue="strict">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select session security" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="strict">Strict</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Security Features</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Force HTTPS</label>
                    <p className="text-xs text-muted-foreground">Require secure HTTPS connections for all traffic</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">CORS Restrictions</label>
                    <p className="text-xs text-muted-foreground">Implement strict cross-origin resource sharing policies</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable Audit Logging</label>
                    <p className="text-xs text-muted-foreground">Track all system and user activities</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Content Security Policy</label>
                    <p className="text-xs text-muted-foreground">Enforce strict content security policies</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="localization" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Localization Settings</CardTitle>
              <CardDescription>
                Configure language, timezone, and regional preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Default Language</label>
                    <Select defaultValue="en">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select default language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español (Spanish)</SelectItem>
                        <SelectItem value="fr">Français (French)</SelectItem>
                        <SelectItem value="de">Deutsch (German)</SelectItem>
                        <SelectItem value="zh">中文 (Chinese)</SelectItem>
                        <SelectItem value="ja">日本語 (Japanese)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Default Timezone</label>
                    <Select defaultValue="utc">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select default timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                        <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                        <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                        <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                        <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                        <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Date Format</label>
                    <Select defaultValue="mdy">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                        <SelectItem value="mdy-text">Month DD, YYYY</SelectItem>
                        <SelectItem value="dmy-text">DD Month YYYY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Time Format</label>
                    <Select defaultValue="12h">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select time format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-hour (1:30 PM)</SelectItem>
                        <SelectItem value="24h">24-hour (13:30)</SelectItem>
                        <SelectItem value="12h-s">12-hour with seconds (1:30:45 PM)</SelectItem>
                        <SelectItem value="24h-s">24-hour with seconds (13:30:45)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Number Format</label>
                    <Select defaultValue="period">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select number format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="period">1,234.56 (Period Decimal)</SelectItem>
                        <SelectItem value="comma">1.234,56 (Comma Decimal)</SelectItem>
                        <SelectItem value="space">1 234,56 (Space Separator)</SelectItem>
                        <SelectItem value="none">123456 (No Separator)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Currency</label>
                    <Select defaultValue="usd">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select default currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="jpy">JPY (¥)</SelectItem>
                        <SelectItem value="cad">CAD (C$)</SelectItem>
                        <SelectItem value="aud">AUD (A$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Localization Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Allow User Language Selection</label>
                    <p className="text-xs text-muted-foreground">Let users choose their preferred language</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Auto-detect Location</label>
                    <p className="text-xs text-muted-foreground">Automatically detect user location for localization</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Allow Timezone Selection</label>
                    <p className="text-xs text-muted-foreground">Let users choose their own timezone</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Right-to-Left Support</label>
                    <p className="text-xs text-muted-foreground">Support right-to-left languages (Arabic, Hebrew, etc.)</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backups" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Export Settings</CardTitle>
              <CardDescription>
                Configure system backups and data export options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Automatic Backup Schedule</label>
                    <Select defaultValue="daily">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select backup frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Backup Storage Location</label>
                    <Select defaultValue="cloud">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select storage location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local Storage</SelectItem>
                        <SelectItem value="cloud">Cloud Storage</SelectItem>
                        <SelectItem value="both">Both Local & Cloud</SelectItem>
                        <SelectItem value="custom">Custom Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Backup Retention Period</label>
                    <Select defaultValue="30">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Data Export Format</label>
                    <Select defaultValue="json">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select export format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="sql">SQL Dump</SelectItem>
                        <SelectItem value="xml">XML</SelectItem>
                        <SelectItem value="multiple">Multiple Formats</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Encryption Method</label>
                    <Select defaultValue="aes256">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select encryption method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Encryption</SelectItem>
                        <SelectItem value="aes128">AES-128</SelectItem>
                        <SelectItem value="aes256">AES-256</SelectItem>
                        <SelectItem value="custom">Custom Encryption</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Compression Level</label>
                    <Select defaultValue="standard">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select compression level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Compression</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="max">Maximum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Backup Options</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Include Chat History</label>
                    <p className="text-xs text-muted-foreground">Include all chat history in backups</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Include User Data</label>
                    <p className="text-xs text-muted-foreground">Include user account information in backups</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Include Configuration</label>
                    <p className="text-xs text-muted-foreground">Include system configuration in backups</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Include Analytics Data</label>
                    <p className="text-xs text-muted-foreground">Include system analytics and reporting data</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-4 sm:flex-row sm:justify-start">
                <Button className="flex items-center gap-2 w-full sm:w-auto">
                  <Download className="h-4 w-4" /> Manual Backup Now
                </Button>
                <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                  <Upload className="h-4 w-4" /> Import Backup
                </Button>
                <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                  <FileJson className="h-4 w-4" /> Export Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
