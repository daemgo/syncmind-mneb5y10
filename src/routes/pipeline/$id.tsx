import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PipelineDetail } from "@/components/pipeline/pipeline-detail";
import { PipelineFormDialog } from "@/components/pipeline/pipeline-form-dialog";
import { pipelineMock } from "@/mock/pipeline";
import { useState } from "react";

export const Route = createFileRoute("/pipeline/$id")({
  component: PipelineDetailPage,
});

function PipelineDetailPage() {
  const { id } = Route.useParams();
  const opportunity = pipelineMock.find((o) => o.id === id);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!opportunity) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">商机不存在</p>
          <Link
            to="/pipeline"
            className="text-primary hover:underline mt-2 inline-block"
          >
            返回销售漏斗
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
          <Link to="/pipeline">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">商机详情</h1>
            <p className="text-muted-foreground mt-1">
              编号：OPP-{opportunity.id.padStart(3, "0")}
            </p>
          </div>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Edit className="h-4 w-4 mr-2" />
          编辑
        </Button>
      </div>

      {/* Detail */}
      <PipelineDetail opportunity={opportunity} />

      {/* Form Dialog */}
      <PipelineFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={opportunity}
      />
    </div>
  );
}
