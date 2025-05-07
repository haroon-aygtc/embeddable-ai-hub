
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AIModelListHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddNewModel: () => void;
}

export const AIModelListHeader = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onAddNewModel
}: AIModelListHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full sm:w-auto">
        <TabsList>
          <TabsTrigger value="all">All Models</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <Input 
          placeholder="Search models..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:w-auto max-w-[300px]"
        />
        <Button onClick={onAddNewModel}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Model
        </Button>
      </div>
    </div>
  );
};
