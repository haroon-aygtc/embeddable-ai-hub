
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Palette, Settings, Sliders } from "lucide-react";

import TemplateSelector from "./TemplateSelector";
import AppearanceTab from "./tabs/AppearanceTab";
import ContentTab from "./tabs/ContentTab";
import BehaviorTab from "./tabs/BehaviorTab";
import AdvancedTab from "./tabs/AdvancedTab";
import WidgetPreview from "./WidgetPreview";
import { widgetTemplates } from "./WidgetTemplates";
import { useWidgetState } from "./useWidgetState";

const WidgetBuilder = () => {
  const {
    settings,
    updateSetting,
    activeTab,
    setActiveTab,
    applyTemplate,
    copied,
    handleCopyCode,
    generateEmbedCode
  } = useWidgetState();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Builder Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Template Selection */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Widget Templates</h3>
            <TemplateSelector 
              templates={widgetTemplates} 
              onSelect={(template) => applyTemplate(template.id)} 
            />
          </CardContent>
        </Card>
        
        {/* Configuration Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
          
          <TabsContent value="appearance">
            <AppearanceTab 
              settings={{
                primaryColor: settings.primaryColor,
                secondaryColor: settings.secondaryColor,
                position: settings.position,
                size: settings.size,
                showBranding: settings.showBranding
              }}
              onUpdate={updateSetting}
            />
          </TabsContent>
          
          <TabsContent value="content">
            <ContentTab 
              settings={{
                title: settings.title,
                subtitle: settings.subtitle,
                botName: settings.botName,
                welcomeMessage: settings.welcomeMessage,
                avatar: settings.avatar
              }}
              onUpdate={updateSetting}
            />
          </TabsContent>
          
          <TabsContent value="behavior">
            <BehaviorTab 
              settings={{
                autoOpen: settings.autoOpen,
                timeDelay: settings.timeDelay,
                timeDelaySeconds: settings.timeDelaySeconds,
                scrollPercentage: settings.scrollPercentage,
                scrollPercentageValue: settings.scrollPercentageValue,
                exitIntent: settings.exitIntent,
                soundNotifications: settings.soundNotifications,
                browserNotifications: settings.browserNotifications,
                bubbleNotificationBadge: settings.bubbleNotificationBadge
              }}
              onUpdate={updateSetting}
            />
          </TabsContent>
          
          <TabsContent value="advanced">
            <AdvancedTab 
              settings={{
                mobileOptimization: settings.mobileOptimization,
                persistentSessions: settings.persistentSessions,
                gdprCompliance: settings.gdprCompliance,
                language: settings.language,
                embedCode: generateEmbedCode()
              }}
              onUpdate={(key, value) => updateSetting(key as any, value)}
              onCopyCode={handleCopyCode}
              copied={copied}
            />
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
                  primaryColor={settings.primaryColor}
                  secondaryColor={settings.secondaryColor}
                  title={settings.title}
                  subtitle={settings.subtitle}
                  welcomeMessage={settings.welcomeMessage}
                  botName={settings.botName}
                  avatar={settings.avatar}
                  size={settings.size}
                  position={settings.position}
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
