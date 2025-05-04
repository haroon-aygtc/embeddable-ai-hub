
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clipboard, Code, Globe } from "lucide-react";

export interface AdvancedSettings {
  mobileOptimization: boolean;
  persistentSessions: boolean;
  gdprCompliance: boolean;
  language: string;
  embedCode: string;
}

interface AdvancedTabProps {
  settings: AdvancedSettings;
  onUpdate: <K extends keyof Omit<AdvancedSettings, "embedCode">>(key: K, value: AdvancedSettings[K]) => void;
  onCopyCode: () => void;
  copied: boolean;
}

const AdvancedTab = ({ settings, onUpdate, onCopyCode, copied }: AdvancedTabProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-lg font-medium">Advanced Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure advanced options for your widget.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Mobile Optimization</p>
            <p className="text-sm text-muted-foreground">
              Automatically adapt widget layout for mobile devices
            </p>
          </div>
          <Switch
            checked={settings.mobileOptimization}
            onCheckedChange={(value) => onUpdate("mobileOptimization", value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Persistent Sessions</p>
            <p className="text-sm text-muted-foreground">
              Remember conversation history between page visits
            </p>
          </div>
          <Switch
            checked={settings.persistentSessions}
            onCheckedChange={(value) => onUpdate("persistentSessions", value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">GDPR Compliance</p>
            <p className="text-sm text-muted-foreground">
              Include privacy policy acceptance in pre-chat form
            </p>
          </div>
          <Switch
            checked={settings.gdprCompliance}
            onCheckedChange={(value) => onUpdate("gdprCompliance", value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Default Language</Label>
          <Select
            value={settings.language}
            onValueChange={(value) => onUpdate("language", value)}
          >
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="it">Italian</SelectItem>
              <SelectItem value="pt">Portuguese</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="embedCode" className="text-lg font-medium">
              Embed Code
            </Label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onCopyCode}
              className="flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Clipboard className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Clipboard className="h-4 w-4" />
                  <span>Copy Code</span>
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Copy and paste this code into your website's HTML to embed the chat widget.
          </p>
          <div className="relative">
            <pre className="bg-slate-950 text-slate-50 p-4 rounded-md text-sm overflow-x-auto">
              <code>{settings.embedCode}</code>
            </pre>
            <div className="absolute top-3 right-3">
              <Code className="h-4 w-4 text-slate-400" />
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md flex gap-3">
            <Globe className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">Installation Instructions</p>
              <p className="text-sm text-amber-700">
                Place this code just before the closing &lt;/body&gt; tag of your HTML file.
                The widget will automatically initialize when your page loads.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedTab;
