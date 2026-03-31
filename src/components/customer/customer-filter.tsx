import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomerFilterProps {
  onFilterChange: (filters: { search: string; status: string }) => void;
}

export function CustomerFilter({ onFilterChange }: CustomerFilterProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ search: value, status });
  };

  const handleStatusChange = (value: string) => {
    setStatus(value === "all" ? "" : value);
    onFilterChange({ search, status: value === "all" ? "" : value });
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    onFilterChange({ search: "", status: "" });
  };

  const hasFilters = search || status;

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索客户名称、公司..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={status || "all"} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-full sm:w-[160px]">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="客户状态" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部状态</SelectItem>
          <SelectItem value="potential">潜在客户</SelectItem>
          <SelectItem value="active">活跃客户</SelectItem>
          <SelectItem value="inactive">非活跃</SelectItem>
        </SelectContent>
      </Select>
      {hasFilters && (
        <Button variant="ghost" onClick={clearFilters} className="px-3">
          <X className="h-4 w-4 mr-1" />
          清除
        </Button>
      )}
    </div>
  );
}
