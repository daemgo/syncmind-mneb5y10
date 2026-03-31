import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerFilter } from "@/components/customer/customer-filter";
import { CustomerTable } from "@/components/customer/customer-table";
import { CustomerFormDialog } from "@/components/customer/customer-form-dialog";
import { customerMock } from "@/mock/customer";
import type { Customer } from "@/types/customer";

export const Route = createFileRoute("/customers/")({
  component: CustomersPage,
});

function CustomersPage() {
  const [filters, setFilters] = useState({ search: "", status: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState<Customer | undefined>();

  const filteredData = customerMock.filter((customer) => {
    const matchesSearch =
      !filters.search ||
      customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      customer.company.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || customer.status === filters.status;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (customer: Customer) => {
    setEditData(customer);
    setDialogOpen(true);
  };

  const handleNew = () => {
    setEditData(undefined);
    setDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) setEditData(undefined);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">客户管理</h1>
          <p className="text-muted-foreground mt-1">
            共 {filteredData.length} 个客户
          </p>
        </div>
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-2" />
          新建客户
        </Button>
      </div>

      {/* Filters */}
      <CustomerFilter onFilterChange={setFilters} />

      {/* Table */}
      <CustomerTable data={filteredData} onEdit={handleEdit} />

      {/* Form Dialog */}
      <CustomerFormDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        data={editData}
      />
    </div>
  );
}
