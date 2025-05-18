
import { z } from "zod";
import { AIModelStatus, AIModelType } from "../types/aiTypes";

export const aiModelFormSchema = z.object({
  name: z.string().min(2, { message: "Model name is required" }),
  provider: z.string().min(2, { message: "Provider name is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  apiKey: z.string().optional(),
  baseUrl: z.string().optional(),
  maxTokens: z.coerce.number().int().positive().optional(),
  temperature: z.coerce.number().min(0).max(1).optional(),
  modelType: z.string(),
  isDefault: z.boolean().optional(),
  status: z.enum(["active", "inactive", "testing"]).optional()
});

export type AIModelFormSchema = z.infer<typeof aiModelFormSchema>;
