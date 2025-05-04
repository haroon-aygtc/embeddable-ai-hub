
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { widgetTemplates } from "./WidgetTemplates";

export interface WidgetSettings {
  // Appearance
  primaryColor: string;
  secondaryColor: string;
  position: string;
  size: number;
  showBranding: boolean;

  // Content
  title: string;
  subtitle: string;
  botName: string;
  welcomeMessage: string;
  avatar: string;

  // Behavior
  autoOpen: boolean;
  timeDelay: boolean;
  timeDelaySeconds: number;
  scrollPercentage: boolean;
  scrollPercentageValue: number;
  exitIntent: boolean;
  soundNotifications: boolean;
  browserNotifications: boolean;
  bubbleNotificationBadge: boolean;

  // Advanced
  mobileOptimization: boolean;
  persistentSessions: boolean;
  gdprCompliance: boolean;
  language: string;
}

export const useWidgetState = () => {
  const [activeTab, setActiveTab] = useState("appearance");
  const [copied, setCopied] = useState(false);
  
  const [settings, setSettings] = useState<WidgetSettings>({
    // Appearance
    primaryColor: "#4a4dd4",
    secondaryColor: "#6370e1",
    position: "bottom-right", 
    size: 60,
    showBranding: true,
    
    // Content
    title: "AI Chat Assistant",
    subtitle: "We typically reply in a few minutes",
    botName: "AI Assistant",
    welcomeMessage: "Hello! 👋 How can I help you today?",
    avatar: "",
    
    // Behavior
    autoOpen: false,
    timeDelay: false,
    timeDelaySeconds: 5,
    scrollPercentage: false,
    scrollPercentageValue: 50,
    exitIntent: false,
    soundNotifications: false,
    browserNotifications: false,
    bubbleNotificationBadge: true,
    
    // Advanced
    mobileOptimization: true,
    persistentSessions: true,
    gdprCompliance: false,
    language: "en"
  });

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
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    setCopied(true);
    
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste it into your website."
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const generateEmbedCode = (): string => {
    return `<script src="https://ai-chat-widget.example.com/widget.js" 
      data-primary-color="${settings.primaryColor}"
      data-secondary-color="${settings.secondaryColor}"
      data-title="${settings.title}"
      data-subtitle="${settings.subtitle}"
      data-welcome-message="${settings.welcomeMessage}"
      data-bot-name="${settings.botName}"
      data-position="${settings.position}"
      data-size="${settings.size}"
      data-show-branding="${settings.showBranding}"
    ></script>`;
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
    generateEmbedCode
  };
};
