
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { widgetTemplates } from "./WidgetTemplates";
import { WidgetSettings } from "./types/widgetTypes";
import { getDefaultSettings } from "./utils/defaultSettings";
import { useImportExport } from "./utils/importExport";
import { generateEmbedCode } from "./utils/embedCode";

export type { WidgetSettings };

export const useWidgetState = () => {
  const [activeTab, setActiveTab] = useState("appearance");
  const [copied, setCopied] = useState(false);
  
  // Load settings from localStorage if available
  const storedSettings = typeof window !== 'undefined' ? localStorage.getItem('widgetSettings') : null;
  
  const [settings, setSettings] = useState<WidgetSettings>(() => {
    if (storedSettings) {
      try {
        return JSON.parse(storedSettings);
      } catch (e) {
        console.error("Failed to parse stored settings:", e);
      }
    }
    
    return getDefaultSettings();
  });

  // Import/export functionality
  const { exportWidgetSettings, handleFileImport } = useImportExport(settings, setSettings);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('widgetSettings', JSON.stringify(settings));
    }
  }, [settings]);

  const updateSetting = <K extends keyof WidgetSettings>(
    key: K,
    value: WidgetSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const applyTemplate = (templateId: string) => {
    const template = widgetTemplates.find((t) => t.id === templateId);
    if (template) {
      setSettings((prev) => ({
        ...prev,
        primaryColor: template.primaryColor,
        secondaryColor: template.secondaryColor,
      }));
      
      toast({
        title: "Template applied",
        description: `The "${template.name}" template has been applied.`
      });
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateEmbedCode(settings));
    setCopied(true);
    
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste it into your website."
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // This will cause the active tab to be highlighted properly
    const tabEl = document.querySelector(`[data-state="active"][role="tab"][value="${activeTab}"]`);
    if (tabEl) {
      tabEl.setAttribute('aria-selected', 'true');
    }
  }, [activeTab]);

  return {
    settings,
    updateSetting,
    activeTab,
    setActiveTab,
    applyTemplate,
    copied,
    handleCopyCode,
    generateEmbedCode: () => generateEmbedCode(settings),
    exportWidgetSettings,
    importWidgetSettings: (jsonString: string) => {
      const { importWidgetSettings } = useImportExport(settings, setSettings);
      importWidgetSettings(jsonString);
    },
    handleFileImport
  };
};
