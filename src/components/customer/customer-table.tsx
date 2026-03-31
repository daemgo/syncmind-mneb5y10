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
import type { Customer } from "@/types/customer";
import { CUSTOMER_STATUS } from "@/types/customer";

interface CustomerTableProps {
  data: Customer[];
  onEdit: (customer: Customer) => void;
}

export function CustomerTable({ data, onEdit }: CustomerTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">编号</TableHead>
            <TableHead>客户名称</TableHead>
            <TableHead>公司</TableHead>
            <TableHead>行业</TableHead>
            <TableHead>状态</TableHead>
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
            data.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-mono text-sm">
                  CUS-{customer.id.padStart(3, "0")}
                </TableCell>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.company}</TableCell>
                <TableCell>{customer.industry}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`
                      ${CUSTOMER_STATUS[customer.status].color} text-white border-0
                    `}
                  >
                    {CUSTOMER_STATUS[customer.status].label}
                  </Badge>
                </TableCell>
                <TableCell>{customer.assignedTo}</TableCell>
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
                          to="/customers/$id"
                          params={{ id: customer.id }}
                          className="flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          查看详情
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(customer)}>
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
