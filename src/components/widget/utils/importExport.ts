
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { WidgetSettings } from "../types/widgetTypes";

export const useImportExport = (
  settings: WidgetSettings,
  setSettings: React.Dispatch<React.SetStateAction<WidgetSettings>>
) => {
  // Function to export widget settings as JSON
  const exportWidgetSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `widget-settings-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Settings exported successfully",
      description: "Your widget configuration has been saved as a JSON file."
    });
  };
  
  // Function to import widget settings from JSON file
  const importWidgetSettings = (jsonString: string) => {
    try {
      const importedSettings = JSON.parse(jsonString) as WidgetSettings;
      setSettings(importedSettings);
      
      toast({
        title: "Settings imported successfully",
        description: "Your widget has been updated with the imported configuration."
      });
    } catch (error) {
      console.error("Failed to import settings:", error);
      
      toast({
        title: "Import failed",
        description: "There was an error importing your settings. Please check the file format.",
        variant: "destructive"
      });
    }
  };
  
  // Function to handle file upload for importing settings
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        importWidgetSettings(content);
      }
    };
    reader.readAsText(file);
    
    // Reset the file input
    if (event.target) {
      event.target.value = '';
    }
  };

  return {
    exportWidgetSettings,
    importWidgetSettings,
    handleFileImport
  };
};
