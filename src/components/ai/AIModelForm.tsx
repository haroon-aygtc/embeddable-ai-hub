
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { AIModelFormValues, AIModelType, AIModelStatus } from "./types/aiTypes";
import { getDefaultModelFormValues } from "./utils/aiModelDefaults";
import { aiModelFormSchema, AIModelFormSchema } from "./form/AIModelFormSchema";
import { AIModelBasicInfo } from "./form/AIModelBasicInfo";
import { AIModelAuthentication } from "./form/AIModelAuthentication";
import { AIModelParameters } from "./form/AIModelParameters";
import { AIModelCapabilities } from "./form/AIModelCapabilities";
import { AIModelStatusFields } from "./form/AIModelStatus";

interface AIModelFormProps {
  initialValues?: Partial<AIModelFormValues>;
  onSubmit: (data: AIModelFormValues & { capabilities: string[] }) => void;
  onCancel: () => void;
  isEditing: boolean;
}

export const AIModelForm = ({ 
  initialValues,
  onSubmit, 
  onCancel,
  isEditing
}: AIModelFormProps) => {
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>(
    initialValues?.capabilities || []
  );

  const defaultValues: Partial<AIModelFormSchema> = {
    ...getDefaultModelFormValues(),
    ...initialValues
  };

  const form = useForm<AIModelFormSchema>({
    resolver: zodResolver(aiModelFormSchema),
    defaultValues
  });

  const handleSubmit = (data: AIModelFormSchema) => {
    // Ensure required fields are present before submitting
    const formData: AIModelFormValues & { capabilities: string[] } = {
      name: data.name,
      provider: data.provider,
      description: data.description,
      apiKey: data.apiKey,
      baseUrl: data.baseUrl,
      maxTokens: data.maxTokens,
      temperature: data.temperature,
      modelType: data.modelType,
      isDefault: data.isDefault || false,
      status: data.status as AIModelStatus,
      capabilities: selectedCapabilities
    };
    
    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <AIModelBasicInfo form={form} />
        <AIModelAuthentication form={form} />
        <AIModelParameters form={form} />
        <AIModelCapabilities 
          selectedCapabilities={selectedCapabilities}
          setSelectedCapabilities={setSelectedCapabilities}
        />
        <AIModelStatusFields form={form} />
        
        <DialogFooter className="pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Save Changes" : "Add Model"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
