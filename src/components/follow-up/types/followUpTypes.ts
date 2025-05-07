
export interface FollowUpOption {
  id: string;
  label: string;
  action?: string;
  nextFollowUpId?: string;
}

export type FollowUpPosition = "Start" | "Inline" | "End";
export type FollowUpStatus = "enabled" | "disabled";
export type FollowUpUseCase = "General" | "Sales" | "Support" | "Tech Support" | "Customer Service" | "Other";

export interface FollowUp {
  id: string;
  name: string;
  content: string;
  position: FollowUpPosition;
  options: FollowUpOption[];
  useCase: FollowUpUseCase;
  status: FollowUpStatus;
  conditions?: {
    operator: "and" | "or";
    rules: Array<{
      field: string;
      condition: "equals" | "contains" | "startsWith" | "endsWith" | "exists";
      value: string;
    }>;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface FollowUpFormValues {
  name: string;
  content: string;
  position: FollowUpPosition;
  useCase: FollowUpUseCase;
  status: FollowUpStatus;
  options: Omit<FollowUpOption, "id">[];
}
