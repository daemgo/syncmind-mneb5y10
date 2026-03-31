import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Eye, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

interface PipelineTableProps {
  data: Opportunity[];
  onEdit: (opp: Opportunity) => void;
}

export function PipelineTable({ data, onEdit }: PipelineTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">编号</TableHead>
            <TableHead>商机名称</TableHead>
            <TableHead>客户</TableHead>
            <TableHead className="text-right">金额</TableHead>
            <TableHead>阶段</TableHead>
            <TableHead className="text-right">概率</TableHead>
            <TableHead>负责人</TableHead>
            <TableHead className="w-[80px]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            data.map((opp) => (
              <TableRow key={opp.id}>
                <TableCell className="font-mono text-sm">
                  OPP-{opp.id.padStart(3, "0")}
                </TableCell>
                <TableCell className="font-medium">{opp.name}</TableCell>
                <TableCell>{opp.customerName}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(opp.value)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${OPPORTUNITY_STAGES[opp.stage].color} text-white border-0`}
                  >
                    {OPPORTUNITY_STAGES[opp.stage].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{opp.probability}%</TableCell>
                <TableCell>{opp.assignee}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          to="/pipeline/$id"
                          params={{ id: opp.id }}
                          className="flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          查看详情
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(opp)}>
                        <Edit className="h-4 w-4 mr-2" />
                        编辑
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
