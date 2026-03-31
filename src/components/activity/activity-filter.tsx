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
import { ACTIVITY_TYPE_OPTIONS } from "@/types/activity";

interface ActivityFilterProps {
  onFilterChange: (filters: { search: string; type: string }) => void;
}

export function ActivityFilter({ onFilterChange }: ActivityFilterProps) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ search: value, type });
  };

  const handleTypeChange = (value: string) => {
    setType(value === "all" ? "" : value);
    onFilterChange({ search, type: value === "all" ? "" : value });
  };

  const clearFilters = () => {
    setSearch("");
    setType("");
    onFilterChange({ search: "", type: "" });
  };

  const hasFilters = search || type;

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索客户名称、主题..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={type || "all"} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-full sm:w-[140px]">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="活动类型" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部类型</SelectItem>
          {ACTIVITY_TYPE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
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
