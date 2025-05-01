import { Post } from "@/entities/post/model/post.types";
import useCommentStore from "../model/useCommentsStore";
import HighlightText from "@/shared/ui/HighLightText";
import useUrl from "@/shared/lib/useUrl";
import useLikeComment from "../model/useLikeComment";
import { Button } from "@/shared/ui";
import { Edit2, ThumbsUp, Trash2 } from "lucide-react";
import { useModalStore } from "@/shared/model/useModalStore";
import useDeleteComment from "../model/useDeleteComment";

const CommentContent = ({ postId }: { postId: Post["id"] }) => {
  const { comments, setSelectedComment } = useCommentStore();
  const { searchQuery } = useUrl();
  const { likeComment } = useLikeComment();
  const { deleteComment } = useDeleteComment();
  const { setShowEditCommentDialog } = useModalStore();

  return (
    <div className="space-y-1">
      {comments[postId]?.map((comment) => (
        <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="font-medium truncate">{comment.user.username}:</span>
            <span className="truncate">
              <HighlightText text={comment.body} highlight={searchQuery} />
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
              <ThumbsUp className="w-3 h-3" />
              <span className="ml-1 text-xs">{comment.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedComment(comment);
                setShowEditCommentDialog(true);
              }}
            >
              <Edit2 className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentContent;
