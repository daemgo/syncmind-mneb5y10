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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Opportunity } from "@/types/pipeline";

interface PipelineFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: Opportunity;
}

export function PipelineFormDialog({
  open,
  onOpenChange,
  data,
}: PipelineFormDialogProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEdit = !!data;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      navigate({ to: "/pipeline" });
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "编辑商机" : "新建商机"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">商机名称</Label>
              <Input
                id="name"
                defaultValue={data?.name}
                placeholder="请输入商机名称"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerName">客户名称</Label>
              <Input
                id="customerName"
                defaultValue={data?.customerName}
                placeholder="请输入客户名称"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="value">商机金额</Label>
              <Input
                id="value"
                type="number"
                defaultValue={data?.value}
                placeholder="请输入金额"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="probability">成交概率（%）</Label>
              <Input
                id="probability"
                type="number"
                min="0"
                max="100"
                defaultValue={data?.probability}
                placeholder="请输入概率"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="stage">商机阶段</Label>
              <Select defaultValue={data?.stage || "qualification"}>
                <SelectTrigger>
                  <SelectValue placeholder="选择阶段" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qualification">资格确认</SelectItem>
                  <SelectItem value="proposal">方案报价</SelectItem>
                  <SelectItem value="negotiation">商务谈判</SelectItem>
                  <SelectItem value="contract">合同签署</SelectItem>
                  <SelectItem value="closed_won">成交</SelectItem>
                  <SelectItem value="closed_lost">丢单</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedCloseDate">预计成交日期</Label>
              <Input
                id="expectedCloseDate"
                type="date"
                defaultValue={data?.expectedCloseDate}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="assignee">负责人</Label>
              <Input
                id="assignee"
                defaultValue={data?.assignee}
                placeholder="请输入负责人姓名"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="createdAt">创建日期</Label>
              <Input
                id="createdAt"
                type="date"
                defaultValue={data?.createdAt}
                required
              />
            </div>
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
