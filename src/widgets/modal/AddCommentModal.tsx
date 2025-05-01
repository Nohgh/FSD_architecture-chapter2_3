import useAddComment from "@/features/commnet/model/useAddComment";
import useCommentStore from "@/features/commnet/model/useCommentsStore";
import { useModalStore } from "@/shared/model/useModalStore";
import { Dialog, DialogContent, DialogHeader, Textarea, Button, DialogTitle } from "@/shared/ui";

const AddCommentModal = () => {
  const { showAddCommentDialog, setShowAddCommentDialog } = useModalStore();
  const { newComment, setNewComment } = useCommentStore();
  const { addComment } = useAddComment();

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCommentModal;
