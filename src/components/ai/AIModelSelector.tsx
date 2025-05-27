
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  SortAsc, 
  SortDesc,
  Zap,
  Brain,
  Eye,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ModelData {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  type: string;
  pricing?: {
    input?: number;
    output?: number;
  };
  capabilities?: string[];
}

interface AIModelSelectorProps {
  models: ModelData[];
  selectedModel: ModelData | null;
  onModelSelect: (model: ModelData) => void;
  isLoading?: boolean;
}

export const AIModelSelector = ({
  models,
  selectedModel,
  onModelSelect,
  isLoading = false
}: AIModelSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "tokens" | "type">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique model types for filtering
  const modelTypes = useMemo(() => {
    const types = new Set(models.map(model => model.type));
    return Array.from(types);
  }, [models]);

  // Filter and sort models
  const filteredModels = useMemo(() => {
    let filtered = models.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           model.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === "all" || model.type === typeFilter;
      return matchesSearch && matchesType;
    });

    // Sort models
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "tokens":
          comparison = a.maxTokens - b.maxTokens;
          break;
        case "type":
          comparison = a.type.localeCompare(b.type);
          break;
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [models, searchQuery, typeFilter, sortBy, sortOrder]);

  const getModelIcon = (type: string) => {
    switch (type) {
      case "multimodal":
        return <Eye className="h-4 w-4" />;
      case "text-generation":
        return <Brain className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const formatTokenCount = (tokens: number) => {
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`;
    } else if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(0)}K`;
    }
    return tokens.toString();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-muted animate-pulse rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search models by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Model Type</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {modelTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="tokens">Token Limit</SelectItem>
                    <SelectItem value="type">Type</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Order</label>
                <Button
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="w-full justify-start gap-2"
                >
                  {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  {sortOrder === "asc" ? "Ascending" : "Descending"}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {filteredModels.length} of {models.length} models
            {searchQuery && ` for "${searchQuery}"`}
          </span>
          {selectedModel && (
            <Badge variant="outline" className="gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full" />
              {selectedModel.name} selected
            </Badge>
          )}
        </div>
      </div>

      {/* Models Display */}
      <ScrollArea className="h-96">
        {filteredModels.length === 0 ? (
          <div className="text-center py-8">
            <Brain className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No models found</h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search query or filters
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
            {filteredModels.map((model) => (
              <Card
                key={model.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedModel?.id === model.id ? "ring-2 ring-primary bg-primary/5" : ""
                }`}
                onClick={() => onModelSelect(model)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getModelIcon(model.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{model.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {model.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {formatTokenCount(model.maxTokens)} tokens
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {model.type}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2 p-1">
            {filteredModels.map((model) => (
              <Card
                key={model.id}
                className={`cursor-pointer transition-all hover:shadow-sm ${
                  selectedModel?.id === model.id ? "ring-2 ring-primary bg-primary/5" : ""
                }`}
                onClick={() => onModelSelect(model)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {getModelIcon(model.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">{model.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {formatTokenCount(model.maxTokens)} tokens
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {model.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {model.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
