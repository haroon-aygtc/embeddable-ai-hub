
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Image, MessageSquare, PlusCircle } from "lucide-react";

export interface ContentSettings {
  title: string;
  subtitle: string;
  botName: string;
  welcomeMessage: string;
  avatar: string;
}

interface ContentTabProps {
  settings: ContentSettings;
  onUpdate: (key: keyof ContentSettings, value: string) => void;
}

const ContentTab = ({ settings, onUpdate }: ContentTabProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-lg font-medium">Widget Content</h3>
          <p className="text-sm text-muted-foreground">
            Customize the text and messages in your widget.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Widget Title</Label>
            <Input
              id="title"
              value={settings.title}
              onChange={(e) => onUpdate("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Widget Subtitle</Label>
            <Input
              id="subtitle"
              value={settings.subtitle}
              onChange={(e) => onUpdate("subtitle", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="botName">Bot Name</Label>
            <Input
              id="botName"
              value={settings.botName}
              onChange={(e) => onUpdate("botName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="welcomeMessage">Welcome Message</Label>
            <Textarea
              id="welcomeMessage"
              value={settings.welcomeMessage}
              onChange={(e) => onUpdate("welcomeMessage", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Bot Avatar</Label>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                {settings.avatar ? (
                  <img
                    src={settings.avatar}
                    alt="Bot avatar"
                    className="h-full w-full rounded-full object-cover"
                  />
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
  );
};

export default ContentTab;
