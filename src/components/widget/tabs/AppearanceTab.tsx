
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import ColorPicker from "../ColorPicker";

export interface AppearanceSettings {
  primaryColor: string;
  secondaryColor: string;
  position: string;
  size: number;
  showBranding: boolean;
}

interface AppearanceTabProps {
  settings: AppearanceSettings;
  onUpdate: (key: keyof AppearanceSettings, value: any) => void;
}

const AppearanceTab = ({ settings, onUpdate }: AppearanceTabProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-lg font-medium">Colors</h3>
          <p className="text-sm text-muted-foreground">
            Customize the colors of your widget.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ColorPicker
            id="primaryColor"
            label="Primary Color"
            value={settings.primaryColor}
            onChange={(value) => onUpdate("primaryColor", value)}
          />
          <ColorPicker
            id="secondaryColor"
            label="Secondary Color"
            value={settings.secondaryColor}
            onChange={(value) => onUpdate("secondaryColor", value)}
          />
        </div>

        <Separator />

        <div className="space-y-1.5">
          <h3 className="text-lg font-medium">Position & Size</h3>
          <p className="text-sm text-muted-foreground">
            Control where and how large your widget appears.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Widget Position</Label>
            <RadioGroup
              value={settings.position}
              onValueChange={(value) => onUpdate("position", value)}
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
              <Label htmlFor="size">Button Size: {settings.size}px</Label>
            </div>
            <Slider
              id="size"
              min={40}
              max={80}
              step={1}
              value={[settings.size]}
              onValueChange={(values) => onUpdate("size", values[0])}
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
            checked={settings.showBranding}
            onCheckedChange={(value) => onUpdate("showBranding", value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceTab;
