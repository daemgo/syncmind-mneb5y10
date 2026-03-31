import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartConfig,
} from "@/components/ui/chart";
import {
  Users,
  Activity,
  TrendingUp,
  DollarSign,
  Clock,
} from "lucide-react";
import { customerMock } from "@/mock/customer";
import { activityMock } from "@/mock/activity";
import { pipelineMock } from "@/mock/pipeline";
import { OPPORTUNITY_STAGES } from "@/types/pipeline";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

const pipelineChartData = [
  { stage: "资格确认", value: 850000, color: "hsl(var(--chart-1))" },
  { stage: "方案报价", value: 520000, color: "hsl(var(--chart-2))" },
  { stage: "商务谈判", value: 380000, color: "hsl(var(--chart-3))" },
  { stage: "合同签署", value: 280000, color: "hsl(var(--chart-4))" },
  { stage: "成交", value: 420000, color: "hsl(var(--chart-5))" },
];

const chartConfig = {
  value: {
    label: "金额",
  },
} satisfies ChartConfig;

const customerStageData = [
  { status: "潜在客户", value: 2, color: "hsl(var(--chart-1))" },
  { status: "活跃客户", value: 2, color: "hsl(var(--chart-2))" },
  { status: "非活跃", value: 1, color: "hsl(var(--muted-foreground))" },
];

const customerChartConfig = {
  value: { label: "客户数" },
} satisfies ChartConfig;

const recentActivities = activityMock.slice(0, 5);

export function DashboardPage() {
  const totalCustomers = customerMock.length;
  const activeCustomers = customerMock.filter((c) => c.status === "active").length;
  const activeOpportunities = pipelineMock.filter(
    (o) => !["closed_won", "closed_lost"].includes(o.stage)
  );
  const totalPipelineValue = activeOpportunities.reduce(
    (sum, o) => sum + o.value,
    0
  );
  const wonOpportunities = pipelineMock.filter((o) => o.stage === "closed_won");
  const wonValue = wonOpportunities.reduce((sum, o) => sum + o.value, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">工作台</h1>
        <p className="text-muted-foreground mt-1">
          欢迎回来，以下是您的业务概览
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              客户总数
            </CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              活跃客户 {activeCustomers}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              跟进中商机
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeOpportunities.length}</div>
            <p className="text-xs text-muted-foreground">
              商机总额 {formatCurrency(totalPipelineValue)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              本月成交
            </CardTitle>
            <DollarSign className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wonOpportunities.length}</div>
            <p className="text-xs text-muted-foreground">
              成交金额 {formatCurrency(wonValue)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              本周跟进
            </CardTitle>
            <Activity className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentActivities.length}</div>
            <p className="text-xs text-muted-foreground">
              最近 7 天活动
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">销售漏斗金额分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <BarChart data={pipelineChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal vertical />
                <XAxis type="number" tickFormatter={(v) => `${v / 10000}万`} />
                <YAxis type="category" dataKey="stage" width={80} />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "金额"]}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {pipelineChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">客户状态分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={customerChartConfig}
              className="h-[280px] w-full"
            >
              <PieChart>
                <Pie
                  data={customerStageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerStageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ChartContainer>
            <div className="flex justify-center gap-4 mt-4">
              {customerStageData.map((item) => (
                <div key={item.status} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.status} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities & Pipeline */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4" />
              最近跟进
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start justify-between border-b pb-3 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{activity.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.customerName} · {activity.date}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">活跃商机</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>商机</TableHead>
                  <TableHead>阶段</TableHead>
                  <TableHead className="text-right">金额</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeOpportunities.slice(0, 5).map((opp) => (
                  <TableRow key={opp.id}>
                    <TableCell className="font-medium">{opp.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${OPPORTUNITY_STAGES[opp.stage].color} text-white border-0 text-xs`}
                      >
                        {OPPORTUNITY_STAGES[opp.stage].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(opp.value)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
