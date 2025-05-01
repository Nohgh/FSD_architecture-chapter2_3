import { Dialog, DialogContent, DialogHeader, Textarea, Button, DialogTitle } from "@/shared/ui";
import { useModalStore } from "@/shared/model/useModalStore";
import useCommentStore from "@/features/commnet/model/useCommentsStore";
import useUpdateComments from "@/features/commnet/model/useUpdateComment";

const EditCommentModal = () => {
  const { showEditCommentDialog, setShowEditCommentDialog } = useModalStore();
  const { selectedComment, setSelectedComment } = useCommentStore();
  const { updateComment } = useUpdateComments();

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => setSelectedComment((prev) => (prev ? { ...prev, body: e.target.value } : null))}
          />
          <Button onClick={() => updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCommentModal;
