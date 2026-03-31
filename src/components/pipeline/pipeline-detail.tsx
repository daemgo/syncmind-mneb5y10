import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Calendar,
  DollarSign,
  Percent,
  Building2,
} from "lucide-react";
import type { Opportunity } from "@/types/pipeline";
import { OPPORTUNITY_STAGES } from "@/types/pipeline";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

interface PipelineDetailProps {
  opportunity: Opportunity;
}

export function PipelineDetail({ opportunity }: PipelineDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">{opportunity.name}</h2>
          <p className="text-muted-foreground">{opportunity.customerName}</p>
        </div>
        <Badge
          className={`${OPPORTUNITY_STAGES[opportunity.stage].color} text-white border-0`}
        >
          {OPPORTUNITY_STAGES[opportunity.stage].label}
        </Badge>
      </div>

      <Separator />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              商机金额
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-500" />
              <span className="text-2xl font-semibold">
                {formatCurrency(opportunity.value)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              成交概率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Percent className="h-5 w-5 text-violet-500" />
              <span className="text-2xl font-semibold">
                {opportunity.probability}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              预计成交日期
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-500" />
              <span className="text-2xl font-semibold">
                {opportunity.expectedCloseDate}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              负责人
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-semibold">
                {opportunity.assignee}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">基本信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">客户：{opportunity.customerName}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">创建时间：{opportunity.createdAt}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
