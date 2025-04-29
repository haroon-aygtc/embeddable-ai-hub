
import { useState } from "react";
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
}

const WidgetPreview: React.FC<WidgetPreviewProps> = ({
  primaryColor = "#4a4dd4",
  secondaryColor = "#6370e1",
  title = "AI Chat Assistant",
  subtitle = "We typically reply in a few minutes",
  welcomeMessage = "Hello! 👋 How can I help you today?",
  botName = "AI Assistant",
  avatar,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const buttonStyle = {
    background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
  };

  return (
    <div className="ai-widget-container relative w-full h-full">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96">
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
        className="ai-widget-button absolute bottom-0 right-0 w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer animate-fade-in z-10 transition-all hover:scale-105"
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
