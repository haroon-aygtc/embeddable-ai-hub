
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import WidgetBuilder from "@/components/widget/WidgetBuilder";
import { WidgetPromptTemplates } from "@/components/widget/WidgetPromptTemplates";
import { Settings, FileText } from "lucide-react";

const WidgetPage = () => {
  const [activeTab, setActiveTab] = useState("builder");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Widget Builder</h2>
        <p className="text-muted-foreground">
          Customize your chat widget, create prompt templates, and generate embed code for your website.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="builder">
            <Settings className="mr-2 h-4 w-4" />
            Widget Builder
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="mr-2 h-4 w-4" />
            Prompt Templates
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="builder" className="mt-6">
          <WidgetBuilder />
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <WidgetPromptTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WidgetPage;
