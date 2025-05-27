
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Users, 
  Power, 
  Trash2, 
  Download, 
  Upload, 
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { AIModel } from "./types/aiTypes";
import { toast } from "sonner";

interface AIModelBulkActionsProps {
  models: AIModel[];
  onBulkStatusChange: (modelIds: string[], status: string) => void;
  onBulkDelete: (modelIds: string[]) => void;
}

export const AIModelBulkActions = ({ 
  models, 
  onBulkStatusChange, 
  onBulkDelete 
}: AIModelBulkActionsProps) => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedModels(models.map(m => m.id));
    } else {
      setSelectedModels([]);
    }
  };

  const handleSelectModel = (modelId: string, checked: boolean) => {
    if (checked) {
      setSelectedModels(prev => [...prev, modelId]);
    } else {
      setSelectedModels(prev => prev.filter(id => id !== modelId));
    }
  };

  const handleBulkAction = () => {
    if (selectedModels.length === 0) {
      toast.error("Please select at least one model");
      return;
    }

    switch (bulkAction) {
      case "activate":
        onBulkStatusChange(selectedModels, "active");
        toast.success(`Activated ${selectedModels.length} models`);
        break;
      case "deactivate":
        onBulkStatusChange(selectedModels, "inactive");
        toast.success(`Deactivated ${selectedModels.length} models`);
        break;
      case "testing":
        onBulkStatusChange(selectedModels, "testing");
        toast.success(`Set ${selectedModels.length} models to testing`);
        break;
      case "delete":
        onBulkDelete(selectedModels);
        toast.success(`Deleted ${selectedModels.length} models`);
        break;
      default:
        toast.error("Please select an action");
        return;
    }

    setSelectedModels([]);
    setBulkAction("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "inactive":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "testing":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "testing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Perform bulk operations on your AI models or get started quickly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button variant="outline" className="gap-2 h-auto py-4">
              <Download className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Export Models</div>
                <div className="text-xs text-muted-foreground">Download config</div>
              </div>
            </Button>
            
            <Button variant="outline" className="gap-2 h-auto py-4">
              <Upload className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Import Models</div>
                <div className="text-xs text-muted-foreground">Upload config</div>
              </div>
            </Button>
            
            <Button variant="outline" className="gap-2 h-auto py-4">
              <RefreshCw className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Sync All</div>
                <div className="text-xs text-muted-foreground">Update status</div>
              </div>
            </Button>
            
            <Button variant="outline" className="gap-2 h-auto py-4">
              <Power className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Health Check</div>
                <div className="text-xs text-muted-foreground">Test all models</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bulk Model Management</CardTitle>
          <CardDescription>
            Select multiple models and perform bulk operations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="select-all"
              checked={selectedModels.length === models.length && models.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <label htmlFor="select-all" className="font-medium">
              Select all models ({models.length})
            </label>
          </div>

          {selectedModels.length > 0 && (
            <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border">
              <span className="font-medium">
                {selectedModels.length} model(s) selected
              </span>
              <Select value={bulkAction} onValueChange={setBulkAction}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Choose action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activate">Activate Selected</SelectItem>
                  <SelectItem value="deactivate">Deactivate Selected</SelectItem>
                  <SelectItem value="testing">Set to Testing</SelectItem>
                  <SelectItem value="delete">Delete Selected</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleBulkAction} disabled={!bulkAction}>
                Apply Action
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedModels([])}
              >
                Clear Selection
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
            {models.map((model) => (
              <div
                key={model.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedModels.includes(model.id)}
                    onCheckedChange={(checked) => 
                      handleSelectModel(model.id, checked as boolean)
                    }
                  />
                  <div className="flex items-center gap-2">
                    {getStatusIcon(model.status)}
                    <span className="font-medium">{model.name}</span>
                  </div>
                  <Badge variant="outline">{model.provider}</Badge>
                </div>
                <Badge className={getStatusColor(model.status)}>
                  {model.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
