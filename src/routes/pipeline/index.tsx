import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PipelineFilter } from "@/components/pipeline/pipeline-filter";
import { PipelineTable } from "@/components/pipeline/pipeline-table";
import { PipelineFormDialog } from "@/components/pipeline/pipeline-form-dialog";
import { pipelineMock } from "@/mock/pipeline";
import type { Opportunity } from "@/types/pipeline";

export const Route = createFileRoute("/pipeline/")({
  component: PipelinePage,
});

function PipelinePage() {
  const [filters, setFilters] = useState({ search: "", stage: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState<Opportunity | undefined>();

  const filteredData = pipelineMock.filter((opp) => {
    const matchesSearch =
      !filters.search ||
      opp.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      opp.customerName.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStage = !filters.stage || opp.stage === filters.stage;
    return matchesSearch && matchesStage;
  });

  const handleEdit = (opp: Opportunity) => {
    setEditData(opp);
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
          <h1 className="text-2xl font-semibold">销售漏斗</h1>
          <p className="text-muted-foreground mt-1">
            共 {filteredData.length} 个商机
          </p>
        </div>
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-2" />
          新建商机
        </Button>
      </div>

      {/* Filters */}
      <PipelineFilter onFilterChange={setFilters} />

      {/* Table */}
      <PipelineTable data={filteredData} onEdit={handleEdit} />

      {/* Form Dialog */}
      <PipelineFormDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        data={editData}
      />
    </div>
  );
}
