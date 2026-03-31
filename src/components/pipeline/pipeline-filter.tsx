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

interface PipelineFilterProps {
  onFilterChange: (filters: { search: string; stage: string }) => void;
}

export function PipelineFilter({ onFilterChange }: PipelineFilterProps) {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ search: value, stage });
  };

  const handleStageChange = (value: string) => {
    setStage(value === "all" ? "" : value);
    onFilterChange({ search, stage: value === "all" ? "" : value });
  };

  const clearFilters = () => {
    setSearch("");
    setStage("");
    onFilterChange({ search: "", stage: "" });
  };

  const hasFilters = search || stage;

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索商机名称、客户..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={stage || "all"} onValueChange={handleStageChange}>
        <SelectTrigger className="w-full sm:w-[160px]">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="商机阶段" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部阶段</SelectItem>
          <SelectItem value="qualification">资格确认</SelectItem>
          <SelectItem value="proposal">方案报价</SelectItem>
          <SelectItem value="negotiation">商务谈判</SelectItem>
          <SelectItem value="contract">合同签署</SelectItem>
          <SelectItem value="closed_won">成交</SelectItem>
          <SelectItem value="closed_lost">丢单</SelectItem>
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
