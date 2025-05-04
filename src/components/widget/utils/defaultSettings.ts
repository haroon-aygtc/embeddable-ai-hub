
import { WidgetSettings } from "../types/widgetTypes";

export const getDefaultSettings = (): WidgetSettings => ({
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
