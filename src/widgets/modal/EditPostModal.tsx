import usePostStore from "@/features/post/model/usePostStore";
import useUpdatePost from "@/features/post/model/useUpdatePost";
import { useModalStore } from "@/shared/model/useModalStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea, Button } from "@/shared/ui";

const EditPostModal = () => {
  const { showEditDialog, setShowEditDialog } = useModalStore();
  const { selectedPost, setSelectedPost } = usePostStore();
  const { updatePost } = useUpdatePost();

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => setSelectedPost((prev) => (prev ? { ...prev, title: e.target.value } : null))}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost((prev) => (prev ? { ...prev, body: e.target.value } : null))}
          />
          <Button onClick={() => updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostModal;
