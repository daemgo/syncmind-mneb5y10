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
import type { Activity } from "@/types/activity";

const typeColors: Record<string, string> = {
  拜访: "bg-blue-500",
  电话: "bg-violet-500",
  邮件: "bg-cyan-500",
  会议: "bg-amber-500",
  其他: "bg-gray-500",
};

interface ActivityTableProps {
  data: Activity[];
  onEdit: (activity: Activity) => void;
}

export function ActivityTable({ data, onEdit }: ActivityTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">编号</TableHead>
            <TableHead>客户名称</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>主题</TableHead>
            <TableHead>日期</TableHead>
            <TableHead>负责人</TableHead>
            <TableHead className="w-[80px]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            data.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-mono text-sm">
                  ACT-{activity.id.padStart(3, "0")}
                </TableCell>
                <TableCell className="font-medium">{activity.customerName}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${typeColors[activity.type] || "bg-gray-500"} text-white border-0`}
                  >
                    {activity.type}
                  </Badge>
                </TableCell>
                <TableCell>{activity.subject}</TableCell>
                <TableCell>{activity.date}</TableCell>
                <TableCell>{activity.assignee}</TableCell>
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
                          to="/activities/$id"
                          params={{ id: activity.id }}
                          className="flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          查看详情
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(activity)}>
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
