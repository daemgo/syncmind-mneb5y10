import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActivityFilter } from "@/components/activity/activity-filter";
import { ActivityTable } from "@/components/activity/activity-table";
import { ActivityFormDialog } from "@/components/activity/activity-form-dialog";
import { activityMock } from "@/mock/activity";
import type { Activity } from "@/types/activity";

export const Route = createFileRoute("/activities/")({
  component: ActivitiesPage,
});

function ActivitiesPage() {
  const [filters, setFilters] = useState({ search: "", type: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState<Activity | undefined>();

  const filteredData = activityMock.filter((activity) => {
    const matchesSearch =
      !filters.search ||
      activity.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
      activity.subject.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = !filters.type || activity.type === filters.type;
    return matchesSearch && matchesType;
  });

  const handleEdit = (activity: Activity) => {
    setEditData(activity);
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
          <h1 className="text-2xl font-semibold">跟进记录</h1>
          <p className="text-muted-foreground mt-1">
            共 {filteredData.length} 条记录
          </p>
        </div>
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-2" />
          新建记录
        </Button>
      </div>

      {/* Filters */}
      <ActivityFilter onFilterChange={setFilters} />

      {/* Table */}
      <ActivityTable data={filteredData} onEdit={handleEdit} />

      {/* Form Dialog */}
      <ActivityFormDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        data={editData}
      />
    </div>
  );
}
