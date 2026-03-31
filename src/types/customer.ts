export interface Customer {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  industry: string;
  status: CustomerStatus;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export type CustomerStatus = "potential" | "active" | "inactive";

export const CUSTOMER_STATUS: Record<CustomerStatus, { label: string; color: string }> = {
  potential: { label: "潜在客户", color: "bg-amber-500" },
  active: { label: "活跃客户", color: "bg-emerald-500" },
  inactive: { label: "非活跃", color: "bg-gray-400" },
};
