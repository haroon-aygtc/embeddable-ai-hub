
import { useState } from "react";
import { X, Minus, ChevronDown, ChevronUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatPreviewProps {
  title: string;
  subtitle: string;
  primaryColor: string;
  secondaryColor: string;
  botName: string;
  welcomeMessage: string;
  avatar?: string;
  onClose: () => void;
  onMinimize: () => void;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({
  title,
  subtitle,
  primaryColor,
  secondaryColor,
  botName,
  welcomeMessage,
  avatar,
  onClose,
  onMinimize,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: welcomeMessage,
      timestamp: new Date(),
    },
  ]);
  
  const [inputValue, setInputValue] = useState('');
  
  const headerStyle = {
    background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
  };
  
  const botInitials = botName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
  
  const sendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: `Thank you for your message! This is a simulated response from ${botName}.`,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg shadow-lg overflow-hidden h-full bg-white dark:bg-gray-800 dark:border-gray-700">
      {/* Chat header */}
      <div style={headerStyle} className="text-white p-4 flex items-center justify-between">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm opacity-90">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onMinimize}>
            <Minus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'bot' && (
              <Avatar className="h-8 w-8 mr-2">
                {avatar ? 
                  <AvatarImage src={avatar} alt={botName} /> :
                  <AvatarFallback>{botInitials}</AvatarFallback>
                }
              </Avatar>
            )}
            <div 
              className={`py-2 px-3 rounded-lg max-w-[80%] ${
                message.role === 'user' 
                  ? `bg-primary text-white` 
                  : 'bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700'
              }`}
            >
              {message.content}
              <div 
                className={`text-[10px] mt-1 ${
                  message.role === 'user' ? 'text-white/70' : 'text-gray-400'
                }`}
              >
                {new Intl.DateTimeFormat('en-US', { 
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true 
                }).format(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input area */}
      <div className="p-3 border-t dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Type your message..."
            className="flex-1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button 
            onClick={sendMessage} 
            style={{ backgroundColor: primaryColor }}
            className="h-9 w-9 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <Separator className="my-2" />
        
        <div className="flex items-center justify-center">
          <span className="text-xs text-gray-400">Powered by AI Chat Hub</span>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;
