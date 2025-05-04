
import { WidgetSettings } from "../types/widgetTypes";

export const generateEmbedCode = (settings: WidgetSettings): string => {
  // Create a more detailed embed code with all relevant settings
  const scriptBaseUrl = "https://ai-chat-widget.example.com/widget.js";
  
  // Format settings as HTML attributes for the script tag
  const configAttrs = Object.entries({
    "primary-color": settings.primaryColor,
    "secondary-color": settings.secondaryColor,
    "widget-title": settings.title,
    "widget-subtitle": settings.subtitle,
    "welcome-message": settings.welcomeMessage,
    "bot-name": settings.botName,
    "position": settings.position,
    "size": settings.size,
    "show-branding": settings.showBranding,
    "auto-open": settings.autoOpen,
    "time-delay": settings.timeDelay ? settings.timeDelaySeconds : 0,
    "scroll-percentage": settings.scrollPercentage ? settings.scrollPercentageValue : 0,
    "exit-intent": settings.exitIntent,
    "sound-notifications": settings.soundNotifications,
    "browser-notifications": settings.browserNotifications,
    "bubble-notifications": settings.bubbleNotificationBadge,
    "mobile-optimization": settings.mobileOptimization,
    "persistent-sessions": settings.persistentSessions,
    "gdpr-compliance": settings.gdprCompliance,
    "language": settings.language,
  }).map(([key, value]) => `data-${key}="${value}"`).join("\n  ");

  return `<!-- AI Chat Widget by AI Chat Hub -->
<script 
  src="${scriptBaseUrl}" 
  id="ai-chat-widget"
  ${configAttrs}
  async
></script>`;
};
