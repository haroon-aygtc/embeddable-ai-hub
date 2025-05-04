
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

export interface BehaviorSettings {
  autoOpen: boolean;
  timeDelay: boolean;
  timeDelaySeconds: number;
  scrollPercentage: boolean;
  scrollPercentageValue: number;
  exitIntent: boolean;
  soundNotifications: boolean;
  browserNotifications: boolean;
  bubbleNotificationBadge: boolean;
}

interface BehaviorTabProps {
  settings: BehaviorSettings;
  onUpdate: (key: keyof BehaviorSettings, value: any) => void;
}

const BehaviorTab = ({ settings, onUpdate }: BehaviorTabProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-lg font-medium">Auto-open Settings</h3>
          <p className="text-sm text-muted-foreground">
            Control when the chat widget automatically opens.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-open on page load</p>
              <p className="text-sm text-muted-foreground">
                Automatically open the widget when the page loads
              </p>
            </div>
            <Switch
              checked={settings.autoOpen}
              onCheckedChange={(value) => onUpdate("autoOpen", value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="delay">Time delay (seconds)</Label>
              <Switch
                checked={settings.timeDelay}
                onCheckedChange={(value) => onUpdate("timeDelay", value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <Slider
                id="delay"
                min={1}
                max={30}
                step={1}
                value={[settings.timeDelaySeconds]}
                onValueChange={(values) =>
                  onUpdate("timeDelaySeconds", values[0])
                }
                disabled={!settings.timeDelay}
              />
              <span className="w-12 text-right">
                {settings.timeDelaySeconds}s
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="scrollPercentage">Scroll percentage</Label>
              <Switch
                checked={settings.scrollPercentage}
                onCheckedChange={(value) => onUpdate("scrollPercentage", value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <Slider
                id="scrollPercentage"
                min={10}
                max={100}
                step={5}
                value={[settings.scrollPercentageValue]}
                onValueChange={(values) =>
                  onUpdate("scrollPercentageValue", values[0])
                }
                disabled={!settings.scrollPercentage}
              />
              <span className="w-12 text-right">
                {settings.scrollPercentageValue}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Exit intent</p>
              <p className="text-sm text-muted-foreground">
                Open when user is about to leave the page
              </p>
            </div>
            <Switch
              checked={settings.exitIntent}
              onCheckedChange={(value) => onUpdate("exitIntent", value)}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-1.5">
          <h3 className="text-lg font-medium">Notification Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure chat notifications and sounds.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sound notifications</p>
              <p className="text-sm text-muted-foreground">
                Play sound when receiving messages
              </p>
            </div>
            <Switch
              checked={settings.soundNotifications}
              onCheckedChange={(value) => onUpdate("soundNotifications", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Browser notifications</p>
              <p className="text-sm text-muted-foreground">
                Show browser notifications for new messages
              </p>
            </div>
            <Switch
              checked={settings.browserNotifications}
              onCheckedChange={(value) =>
                onUpdate("browserNotifications", value)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Bubble notification badge</p>
              <p className="text-sm text-muted-foreground">
                Show a badge on the chat button for new messages
              </p>
            </div>
            <Switch
              checked={settings.bubbleNotificationBadge}
              onCheckedChange={(value) =>
                onUpdate("bubbleNotificationBadge", value)
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BehaviorTab;
