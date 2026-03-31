import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Calendar,
  Clock,
  FileText,
  ArrowRight,
} from "lucide-react";
import type { Activity } from "@/types/activity";

const typeColors: Record<string, string> = {
  拜访: "bg-blue-500",
  电话: "bg-violet-500",
  邮件: "bg-cyan-500",
  会议: "bg-amber-500",
  其他: "bg-gray-500",
};

interface ActivityDetailProps {
  activity: Activity;
}

export function ActivityDetail({ activity }: ActivityDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">{activity.subject}</h2>
          <p className="text-muted-foreground">客户：{activity.customerName}</p>
        </div>
        <Badge
          className={`${typeColors[activity.type] || "bg-gray-500"} text-white border-0`}
        >
          {activity.type}
        </Badge>
      </div>

      <Separator />

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">负责人：{activity.assignee}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">活动日期：{activity.date}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">活动内容</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3">
              <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activity.content}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Follow-up */}
      {activity.nextFollowUp && (
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              下次跟进计划
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">{activity.nextFollowUp}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
