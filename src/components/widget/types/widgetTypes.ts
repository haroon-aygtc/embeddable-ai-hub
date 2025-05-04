
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
