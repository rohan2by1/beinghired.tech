//src\components\SearchBar.tsx
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full px-1">
      <Input
        type="text"
        placeholder="Search by title or company name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-14 pl-5 pr-14 text-base bg-card border-border rounded-lg card-shadow focus:card-shadow-hover transition-shadow"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Search className="w-5 h-5" />
      </div>
    </div>
  );
};

export default SearchBar;
