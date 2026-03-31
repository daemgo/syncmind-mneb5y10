import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerDetail } from "@/components/customer/customer-detail";
import { CustomerFormDialog } from "@/components/customer/customer-form-dialog";
import { customerMock } from "@/mock/customer";
import { useState } from "react";
import type { Customer } from "@/types/customer";

export const Route = createFileRoute("/customers/$id")({
  component: CustomerDetailPage,
});

function CustomerDetailPage() {
  const { id } = Route.useParams();
  const customer = customerMock.find((c) => c.id === id);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!customer) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">客户不存在</p>
          <Link
            to="/customers"
            className="text-primary hover:underline mt-2 inline-block"
          >
            返回客户列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/customers">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">客户详情</h1>
            <p className="text-muted-foreground mt-1">
              编号：CUS-{customer.id.padStart(3, "0")}
            </p>
          </div>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Edit className="h-4 w-4 mr-2" />
          编辑
        </Button>
      </div>

      {/* Detail */}
      <CustomerDetail customer={customer} />

      {/* Form Dialog */}
      <CustomerFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={customer}
      />
    </div>
  );
}
