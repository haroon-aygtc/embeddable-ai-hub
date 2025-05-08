
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface AIModelParametersProps {
  form: UseFormReturn<any>;
}

export const AIModelParameters = ({ form }: AIModelParametersProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="temperature"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Temperature (0-1)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.1" 
                min="0" 
                max="1" 
                placeholder="0.7" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Lower values are more deterministic, higher values more creative.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="maxTokens"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Max Tokens</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min="1"
                placeholder="1000" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Maximum number of tokens to generate.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
