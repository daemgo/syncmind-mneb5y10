export interface Activity {
  id: string;
  customerId: string;
  customerName: string;
  type: ActivityType;
  subject: string;
  content: string;
  date: string;
  assignee: string;
  nextFollowUp: string | null;
}

export type ActivityType = "拜访" | "电话" | "邮件" | "会议" | "其他";

export const ACTIVITY_TYPE_OPTIONS = [
  { value: "拜访", label: "拜访" },
  { value: "电话", label: "电话" },
  { value: "邮件", label: "邮件" },
  { value: "会议", label: "会议" },
  { value: "其他", label: "其他" },
] as const;
