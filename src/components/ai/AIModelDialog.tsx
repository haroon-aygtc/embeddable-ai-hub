
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AIModel, AIModelFormValues } from "./types/aiTypes";
import { AIModelConfigWizard } from "./AIModelConfigWizard";

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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6">
          <AIModelConfigWizard
            model={editingModel || undefined}
            onSave={onSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
