export interface Opportunity {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  value: number;
  stage: OpportunityStage;
  probability: number;
  expectedCloseDate: string;
  assignee: string;
  createdAt: string;
}

export type OpportunityStage =
  | "qualification"
  | "proposal"
  | "negotiation"
  | "contract"
  | "closed_won"
  | "closed_lost";

export const OPPORTUNITY_STAGES: Record<
  OpportunityStage,
  { label: string; color: string; order: number }
> = {
  qualification: { label: "资格确认", color: "bg-blue-500", order: 1 },
  proposal: { label: "方案报价", color: "bg-violet-500", order: 2 },
  negotiation: { label: "商务谈判", color: "bg-amber-500", order: 3 },
  contract: { label: "合同签署", color: "bg-orange-500", order: 4 },
  closed_won: { label: "成交", color: "bg-emerald-500", order: 5 },
  closed_lost: { label: "丢单", color: "bg-gray-500", order: 6 },
};
