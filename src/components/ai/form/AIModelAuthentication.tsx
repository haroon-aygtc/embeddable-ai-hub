
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface AIModelAuthenticationProps {
  form: UseFormReturn<any>;
}

export const AIModelAuthentication = ({ form }: AIModelAuthenticationProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="apiKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>API Key</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Enter your API key" {...field} />
            </FormControl>
            <FormDescription>
              This will be stored securely.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="baseUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Base URL (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="https://api.example.com" {...field} />
            </FormControl>
            <FormDescription>
              For custom endpoints or self-hosted models.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
