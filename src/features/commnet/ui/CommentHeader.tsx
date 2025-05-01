import { Button } from "@/shared/ui";
import { Plus } from "lucide-react";
import useCommentStore from "../model/useCommentsStore";
import { Post } from "@/entities/post/model/post.types";
import { useModalStore } from "@/shared/model/useModalStore";

const CommentHeader = ({ postId }: { postId: Post["id"] }) => {
  const { setNewComment } = useCommentStore();
  const { setShowAddCommentDialog } = useModalStore();

  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold">댓글</h3>
      <Button
        size="sm"
        onClick={() => {
          setNewComment((prev) => ({ ...prev, postId }));
          setShowAddCommentDialog(true);
        }}
      >
        <Plus className="w-3 h-3 mr-1" />
        댓글 추가
      </Button>
    </div>
  );
};

export default CommentHeader;
