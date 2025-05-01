import useQueryParams from "@/shared/lib/useQueryParams";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/shared/ui";
import useTagStore from "../model/useTagStore";
import useFetchPostsByTag from "../model/useFetchPostsByTag";

const PostFilter = () => {
  const { updateURL, sortBy, setSortBy, sortOrder, setSortOrder, selectedTag, setSelectedTag } = useQueryParams();
  const { tags } = useTagStore();
  const { fetchPostsByTag } = useFetchPostsByTag();

  return (
    <>
      <Select
        value={selectedTag}
        onValueChange={(value) => {
          setSelectedTag(value);
          fetchPostsByTag(value);
          updateURL();
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default PostFilter;
