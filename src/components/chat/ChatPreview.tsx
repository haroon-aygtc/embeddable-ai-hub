
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Minimize2, ArrowUp, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatPreviewProps {
  title?: string;
  subtitle?: string;
  primaryColor?: string;
  secondaryColor?: string;
  botName?: string;
  welcomeMessage?: string;
  avatar?: string;
  onClose?: () => void;
  onMinimize?: () => void;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({
  title = "AI Chat Assistant",
  subtitle = "We typically reply in a few minutes",
  primaryColor = "#4a4dd4",
  secondaryColor = "#6370e1",
  botName = "AI Assistant",
  welcomeMessage = "Hello! 👋 How can I help you today?",
  avatar = "",
  onClose,
  onMinimize,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    // Add welcome message
    setMessages([
      {
        id: "welcome",
        content: welcomeMessage,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, [welcomeMessage]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageInput,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setMessageInput("");
    setIsTyping(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm an AI assistant here to help you. This is a preview of how the chat widget will look to your users.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const headerStyle = {
    background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
  };

  return (
    <div className="ai-widget-popup flex flex-col w-full h-full rounded-lg overflow-hidden shadow-lg border border-border">
      {/* Chat Header */}
      <div 
        className="p-4 text-white flex items-start justify-between"
        style={headerStyle}
      >
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm opacity-90">{subtitle}</p>
        </div>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20" 
            onClick={onMinimize}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4 bg-zinc-50">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg max-w-[80%] ${
                message.sender === "user" 
                  ? "ml-auto bg-primary text-primary-foreground" 
                  : "mr-auto bg-muted"
              }`}
            >
              {message.content}
            </div>
          ))}
          
          {isTyping && (
            <div className="p-3 rounded-lg max-w-[80%] mr-auto bg-muted">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></span>
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Chat Input */}
      <div className="p-4 border-t border-border bg-white">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            className="flex-1"
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            style={{ backgroundColor: primaryColor }}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;
