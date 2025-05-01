import useLoadingStore from "@/features/post/model/useLoadingStore";
import PostFilter from "@/features/post/ui/PostFilter";
import PostSearch from "@/features/post/ui/PostSearch";
import { CardContent } from "@/shared/ui";
import Loading from "@/shared/ui/Loading";
import PostTable from "./PostTable";
import PostPageNations from "@/features/post/ui/PostPageNations";

const PostContent = () => {
  const { loading } = useLoadingStore();

  return (
    <CardContent>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <PostSearch />
          <PostFilter />
        </div>

        {loading ? <Loading /> : <PostTable />}

        <PostPageNations />
      </div>
    </CardContent>
  );
};

export default PostContent;
