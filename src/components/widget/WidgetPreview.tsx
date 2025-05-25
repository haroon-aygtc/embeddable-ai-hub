
import { useState, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import ChatPreview from "@/components/chat/ChatPreview";

interface WidgetPreviewProps {
  primaryColor?: string;
  secondaryColor?: string;
  title?: string;
  subtitle?: string;
  welcomeMessage?: string;
  botName?: string;
  avatar?: string;
  size?: number;
  position?: string;
}

const WidgetPreview: React.FC<WidgetPreviewProps> = ({
  primaryColor = "#4a4dd4",
  secondaryColor = "#6370e1",
  title = "AI Chat Assistant",
  subtitle = "We typically reply in a few minutes",
  welcomeMessage = "Hello! 👋 How can I help you today?",
  botName = "AI Assistant",
  avatar,
  size = 60,
  position = "bottom-right",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [showPopupHint, setShowPopupHint] = useState(false);
  
  // Reset state when props change to refresh the preview
  useEffect(() => {
    setIsOpen(false);
    
    // Display a hint popup briefly when colors change
    setShowPopupHint(true);
    setTimeout(() => setShowPopupHint(false), 1500);
    
    // Simulate notification after 2 seconds if widget is closed
    const timer = setTimeout(() => {
      if (!isOpen) {
        setHasNotification(true);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [primaryColor, secondaryColor, title, subtitle, welcomeMessage, botName, avatar, size, position]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    setHasNotification(false);
  };

  const buttonStyle = {
    background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
    width: `${size}px`,
    height: `${size}px`,
    boxShadow: `0 4px 12px ${primaryColor}80`,
    transition: "all 0.3s ease"
  };

  // Determine position classes
  const getPositionClasses = () => {
    switch (position) {
      case "bottom-left":
        return { button: "bottom-4 left-4", widget: "bottom-20 left-4" };
      case "top-right":
        return { button: "top-4 right-4", widget: "top-20 right-4" };
      case "top-left":
        return { button: "top-4 left-4", widget: "top-20 left-4" };
      case "bottom-right":
      default:
        return { button: "bottom-4 right-4", widget: "bottom-20 right-4" };
    }
  };

  const positionClasses = getPositionClasses();

  return (
    <div className="ai-widget-container relative w-full h-full pointer-events-none">
      {/* Color change hint popup */}
      {showPopupHint && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg animate-in fade-in zoom-in-95 duration-300 z-50 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: primaryColor }}></div>
            <span className="text-sm font-medium">Colors updated</span>
          </div>
        </div>
      )}
      
      {isOpen && (
        <div className={`absolute ${positionClasses.widget} w-72 h-96 shadow-lg animate-in zoom-in-95 slide-in-from-bottom-5 duration-200 z-40 pointer-events-auto`}>
          <ChatPreview
            title={title}
            subtitle={subtitle}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            botName={botName}
            welcomeMessage={welcomeMessage}
            avatar={avatar}
            onClose={() => setIsOpen(false)}
            onMinimize={() => setIsOpen(false)}
          />
        </div>
      )}
      
      <div 
        className={`ai-widget-button absolute ${positionClasses.button} rounded-full flex items-center justify-center shadow-lg cursor-pointer animate-fade-in z-30 transition-all hover:scale-105 pointer-events-auto`}
        style={buttonStyle}
        onClick={toggleChat}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageSquare className="h-6 w-6 text-white" />
        )}
        
        {/* Notification badge */}
        {hasNotification && !isOpen && (
          <span 
            className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white animate-pulse"
            title="New message"
          ></span>
        )}
      </div>
    </div>
  );
};

export default WidgetPreview;
