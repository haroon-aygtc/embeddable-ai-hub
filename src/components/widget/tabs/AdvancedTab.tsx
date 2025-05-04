
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

export interface AdvancedSettings {
  mobileOptimization: boolean;
  persistentSessions: boolean;
  gdprCompliance: boolean;
  language: string;
  embedCode: string;
}

interface AdvancedTabProps {
  settings: AdvancedSettings;
  onUpdate: (key: keyof AdvancedSettings, value: any) => void;
  onCopyCode: () => void;
  copied: boolean;
}

const AdvancedTab = ({ settings, onUpdate, onCopyCode, copied }: AdvancedTabProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-lg font-medium">Embed Code</h3>
          <p className="text-sm text-muted-foreground">
            Copy and paste this code into your website.
          </p>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Textarea
              rows={6}
              readOnly
              value={settings.embedCode}
              className="font-mono text-sm"
            />
            <Button
              className="absolute top-2 right-2"
              size="sm"
              onClick={onCopyCode}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            This code should be added just before the closing &lt;/body&gt; tag.
          </p>
        </div>

        <Separator />

        <div className="space-y-1.5">
          <h3 className="text-lg font-medium">Additional Settings</h3>
          <p className="text-sm text-muted-foreground">
            Advanced configuration options.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mobile optimization</p>
              <p className="text-sm text-muted-foreground">
                Optimize widget for mobile devices
              </p>
            </div>
            <Switch
              checked={settings.mobileOptimization}
              onCheckedChange={(value) => onUpdate("mobileOptimization", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Persistent sessions</p>
              <p className="text-sm text-muted-foreground">
                Save chat history between sessions
              </p>
            </div>
            <Switch
              checked={settings.persistentSessions}
              onCheckedChange={(value) => onUpdate("persistentSessions", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">GDPR compliance notice</p>
              <p className="text-sm text-muted-foreground">
                Show data usage consent message
              </p>
            </div>
            <Switch
              checked={settings.gdprCompliance}
              onCheckedChange={(value) => onUpdate("gdprCompliance", value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select 
              value={settings.language}
              onValueChange={(value) => onUpdate("language", value)}
            >
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
  );
};

export default AdvancedTab;
