
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageSquare, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container max-w-5xl px-4 py-8">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-brand-600 bg-clip-text text-transparent">
            AI-Powered Embeddable Chat System
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The most advanced, fully independent AI-driven chat system for websites. Customize, integrate, and manage your chat experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Universal Compatibility</h3>
            <p className="text-muted-foreground mb-4">
              Integrates seamlessly with any website or platform with minimal code.
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Context-Aware AI</h3>
            <p className="text-muted-foreground mb-4">
              Advanced AI models that can be configured to specific knowledge domains.
            </p>
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Customizable Interface</h3>
            <p className="text-muted-foreground mb-4">
              Fully customize the look and feel of your chat widget to match your brand.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button size="lg" onClick={() => navigate("/dashboard")} className="gap-2">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
