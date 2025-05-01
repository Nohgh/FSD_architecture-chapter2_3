import { Post } from "@/entities/post/model/post.types";
import CommentHeader from "@/features/commnet/ui/CommentHeader";
import CommentContent from "@/features/commnet/ui/CommentContent";

const Comment = ({ postId }: { postId: Post["id"] }) => {
  return (
    <div className="mt-2">
      <CommentHeader postId={postId} />
      <CommentContent postId={postId} />
    </div>
  );
};

export default Comment;
