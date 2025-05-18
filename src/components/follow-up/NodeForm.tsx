
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FollowUpNode } from "@/api/types";

// Form schema for node validation
const nodeFormSchema = z.object({
  type: z.enum(["email", "task", "conditional"]),
  content: z.string().min(5, "Content must be at least 5 characters"),
  delay: z.number().min(0).default(0),
  delayUnit: z.enum(["minutes", "hours", "days"]).default("days"),
});

interface NodeFormProps {
  node?: FollowUpNode;
  onSubmit: (data: z.infer<typeof nodeFormSchema>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function NodeForm({ node, onSubmit, onCancel, isSubmitting }: NodeFormProps) {
  const form = useForm<z.infer<typeof nodeFormSchema>>({
    resolver: zodResolver(nodeFormSchema),
    defaultValues: {
      type: node?.type || "email",
      content: node?.content || "",
      delay: node?.delay || 0,
      delayUnit: node?.delayUnit || "days",
    },
  });

  const handleSubmit = (data: z.infer<typeof nodeFormSchema>) => {
    onSubmit({
      ...data,
      delay: Number(data.delay), // Ensure delay is a number
    });
  };

  const nodeType = form.watch("type");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Node Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select node type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="conditional">Conditional</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The type of action this node will perform
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{nodeType === "email" ? "Email Content" : 
                         nodeType === "task" ? "Task Description" : 
                         "Condition Description"}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={
                    nodeType === "email" ? "Write the email content here..." : 
                    nodeType === "task" ? "Describe the task that needs to be performed..." : 
                    "Describe the condition that will be evaluated..."
                  }
                  rows={4}
                />
              </FormControl>
              <FormDescription>
                {nodeType === "email" ? "The content of the email to be sent" : 
                 nodeType === "task" ? "Description of the task to be completed" : 
                 "Description of the condition to evaluate"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="delay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delay</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  How long to wait before executing this node
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="delayUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delay Unit</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The unit of time for the delay
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : node ? "Update Node" : "Add Node"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
