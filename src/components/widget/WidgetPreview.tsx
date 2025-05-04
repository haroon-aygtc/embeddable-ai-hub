
import { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
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
  
  // Reset state when props change to refresh the preview
  useEffect(() => {
    setIsOpen(false);
  }, [primaryColor, secondaryColor, title, subtitle, welcomeMessage, botName, avatar, size, position]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const buttonStyle = {
    background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
    width: `${size}px`,
    height: `${size}px`,
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
    <div className="ai-widget-container relative w-full h-full">
      {isOpen && (
        <div className={`absolute ${positionClasses.widget} w-72 h-96 shadow-lg`}>
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
        className={`ai-widget-button absolute ${positionClasses.button} rounded-full flex items-center justify-center shadow-lg cursor-pointer animate-fade-in z-10 transition-all hover:scale-105`}
        style={buttonStyle}
        onClick={toggleChat}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageSquare className="h-6 w-6 text-white" />
        )}
      </div>
    </div>
  );
};

export default WidgetPreview;
