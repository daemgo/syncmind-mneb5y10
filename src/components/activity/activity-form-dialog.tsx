import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Activity } from "@/types/activity";
import { ACTIVITY_TYPE_OPTIONS } from "@/types/activity";

interface ActivityFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: Activity;
}

export function ActivityFormDialog({
  open,
  onOpenChange,
  data,
}: ActivityFormDialogProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEdit = !!data;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      navigate({ to: "/activities" });
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "编辑跟进记录" : "新建跟进记录"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customerName">客户名称</Label>
              <Input
                id="customerName"
                defaultValue={data?.customerName}
                placeholder="请输入客户名称"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">活动类型</Label>
              <Select defaultValue={data?.type || "拜访"}>
                <SelectTrigger>
                  <SelectValue placeholder="选择类型" />
                </SelectTrigger>
                <SelectContent>
                  {ACTIVITY_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">主题</Label>
            <Input
              id="subject"
              defaultValue={data?.subject}
              placeholder="请输入跟进主题"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">跟进内容</Label>
            <Textarea
              id="content"
              defaultValue={data?.content}
              placeholder="请输入跟进内容详情"
              rows={4}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">活动日期</Label>
              <Input
                id="date"
                type="date"
                defaultValue={data?.date}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignee">负责人</Label>
              <Input
                id="assignee"
                defaultValue={data?.assignee}
                placeholder="请输入负责人姓名"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextFollowUp">下次跟进日期（选填）</Label>
            <Input
              id="nextFollowUp"
              type="date"
              defaultValue={data?.nextFollowUp || ""}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "保存中..." : "保存"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
