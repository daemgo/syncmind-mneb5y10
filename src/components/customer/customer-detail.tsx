import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Building2,
  User,
  Calendar,
  Tag,
} from "lucide-react";
import type { Customer } from "@/types/customer";
import { CUSTOMER_STATUS } from "@/types/customer";

interface CustomerDetailProps {
  customer: Customer;
}

export function CustomerDetail({ customer }: CustomerDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">{customer.name}</h2>
          <p className="text-muted-foreground">{customer.company}</p>
        </div>
        <Badge
          className={`${CUSTOMER_STATUS[customer.status].color} text-white border-0`}
        >
          {CUSTOMER_STATUS[customer.status].label}
        </Badge>
      </div>

      <Separator />

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">姓名：{customer.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">公司：{customer.company}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{customer.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{customer.phone}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">业务信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">行业：{customer.industry}</span>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">负责人：{customer.assignedTo}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">创建时间：{customer.createdAt}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tags */}
      {customer.tags.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">标签</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {customer.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
