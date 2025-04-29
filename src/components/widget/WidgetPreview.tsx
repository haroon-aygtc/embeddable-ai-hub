
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
    <div className="ai-widget-container">
      {isOpen && (
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
      )}
      
      <div 
        className="ai-widget-button animate-fade-in"
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
