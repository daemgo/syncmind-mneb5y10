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
import type { Customer } from "@/types/customer";

interface CustomerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: Customer;
}

export function CustomerFormDialog({
  open,
  onOpenChange,
  data,
}: CustomerFormDialogProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEdit = !!data;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      navigate({ to: "/customers" });
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "编辑客户" : "新建客户"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">客户名称</Label>
              <Input
                id="name"
                defaultValue={data?.name}
                placeholder="请输入客户名称"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">公司名称</Label>
              <Input
                id="company"
                defaultValue={data?.company}
                placeholder="请输入公司名称"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">联系电话</Label>
              <Input
                id="phone"
                defaultValue={data?.phone}
                placeholder="请输入联系电话"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                defaultValue={data?.email}
                placeholder="请输入邮箱"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="industry">行业</Label>
              <Input
                id="industry"
                defaultValue={data?.industry}
                placeholder="请输入行业"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">客户状态</Label>
              <Select defaultValue={data?.status || "potential"}>
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="potential">潜在客户</SelectItem>
                  <SelectItem value="active">活跃客户</SelectItem>
                  <SelectItem value="inactive">非活跃</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedTo">负责人</Label>
            <Input
              id="assignedTo"
              defaultValue={data?.assignedTo}
              placeholder="请输入负责人姓名"
              required
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
