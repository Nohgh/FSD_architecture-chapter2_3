import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui";
import HighlightText from "@/shared/ui/HighLightText";
import Comment from "../comment/Comment";
import { useModalStore } from "@/shared/model/useModalStore";
import usePostStore from "@/features/post/model/usePostStore";
import useQueryParams from "@/shared/lib/useQueryParams";

const PostDetailModal = () => {
  const { searchQuery } = useQueryParams();
  const { showPostDetailDialog, setShowPostDetailDialog } = useModalStore();
  const { selectedPost } = usePostStore();

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={selectedPost?.title || ""} highlight={searchQuery} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <HighlightText text={selectedPost?.body || ""} highlight={searchQuery} />
          </p>
          <Comment postId={selectedPost?.id || 0} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailModal;
