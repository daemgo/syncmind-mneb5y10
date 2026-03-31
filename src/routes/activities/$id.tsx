import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActivityDetail } from "@/components/activity/activity-detail";
import { ActivityFormDialog } from "@/components/activity/activity-form-dialog";
import { activityMock } from "@/mock/activity";
import { useState } from "react";

export const Route = createFileRoute("/activities/$id")({
  component: ActivityDetailPage,
});

function ActivityDetailPage() {
  const { id } = Route.useParams();
  const activity = activityMock.find((a) => a.id === id);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!activity) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">记录不存在</p>
          <Link
            to="/activities"
            className="text-primary hover:underline mt-2 inline-block"
          >
            返回跟进记录
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
          <Link to="/activities">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">跟进详情</h1>
            <p className="text-muted-foreground mt-1">
              编号：ACT-{activity.id.padStart(3, "0")}
            </p>
          </div>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Edit className="h-4 w-4 mr-2" />
          编辑
        </Button>
      </div>

      {/* Detail */}
      <ActivityDetail activity={activity} />

      {/* Form Dialog */}
      <ActivityFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={activity}
      />
    </div>
  );
}
