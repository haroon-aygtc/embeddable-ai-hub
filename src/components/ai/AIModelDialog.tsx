
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AIModel, AIModelFormValues } from "./types/aiTypes";
import { AIModelForm } from "./AIModelForm";

interface AIModelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingModel: AIModel | null;
  onSubmit: (data: AIModelFormValues & { capabilities: string[] }) => void;
}

export const AIModelDialog = ({
  open,
  onOpenChange,
  editingModel,
  onSubmit
}: AIModelDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingModel ? `Configure ${editingModel.name}` : "Add New AI Model"}</DialogTitle>
          <DialogDescription>
            {editingModel 
              ? "Adjust the settings for this AI model to optimize its performance."
              : "Add a new AI model to your system by providing the required information."}
          </DialogDescription>
        </DialogHeader>
        
        <AIModelForm
          initialValues={editingModel || undefined}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isEditing={!!editingModel}
        />
      </DialogContent>
    </Dialog>
  );
};
