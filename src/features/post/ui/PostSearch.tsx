import useUrl from "@/shared/lib/useUrl";
import { Input } from "@/shared/ui";
import { Search } from "lucide-react";
import useSearchPosts from "../model/useSearchPosts";

const PostSearch = () => {
  const { searchQuery, setSearchQuery } = useUrl();
  const { searchPosts } = useSearchPosts();

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchPosts(searchQuery)}
        />
      </div>
    </div>
  );
};

export default PostSearch;
