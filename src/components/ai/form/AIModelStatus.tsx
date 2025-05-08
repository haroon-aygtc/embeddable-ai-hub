
import { FormField, FormItem, FormLabel, FormDescription, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { AIModelStatus } from "../types/aiTypes";

interface AIModelStatusProps {
  form: UseFormReturn<any>;
}

export const AIModelStatusFields = ({ form }: AIModelStatusProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Model Status</FormLabel>
              <FormDescription>
                Set as active to make available for use
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value === "active"}
                onCheckedChange={(checked) => 
                  field.onChange(checked ? "active" as AIModelStatus : "inactive" as AIModelStatus)
                }
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="isDefault"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Default Model</FormLabel>
              <FormDescription>
                Set as default model for the system
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
