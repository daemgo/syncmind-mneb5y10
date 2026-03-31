export const dictionaries = {
  "dict-customer-status": [
    { label: "潜在客户", value: "potential", color: "amber" },
    { label: "活跃客户", value: "active", color: "emerald" },
    { label: "非活跃", value: "inactive", color: "gray" },
  ],
  "dict-activity-type": [
    { label: "拜访", value: "拜访", color: "blue" },
    { label: "电话", value: "电话", color: "violet" },
    { label: "邮件", value: "邮件", color: "cyan" },
    { label: "会议", value: "会议", color: "amber" },
    { label: "其他", value: "其他", color: "gray" },
  ],
  "dict-pipeline-stage": [
    { label: "资格确认", value: "qualification", color: "blue" },
    { label: "方案报价", value: "proposal", color: "violet" },
    { label: "商务谈判", value: "negotiation", color: "amber" },
    { label: "合同签署", value: "contract", color: "orange" },
    { label: "成交", value: "closed_won", color: "emerald" },
    { label: "丢单", value: "closed_lost", color: "gray" },
  ],
} as const;

export function getDictOptions(dictId: string) {
  return dictionaries[dictId as keyof typeof dictionaries] || [];
}

export function getDictLabel(dictId: string, value: string): string {
  const options = getDictOptions(dictId);
  return options.find((o) => o.value === value)?.label ?? value;
}

export function getDictColor(dictId: string, value: string): string | undefined {
  const options = getDictOptions(dictId);
  return options.find((o) => o.value === value)?.color;
}
