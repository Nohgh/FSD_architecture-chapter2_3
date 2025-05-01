import AddCommentModal from "./AddCommentModal";
import AddPostModal from "./AddPostModal";
import EditCommentModal from "./EditCommentModal";
import PostDetailModal from "./PostDetailModal";
import UserModal from "./UserModal";

const ModalWrapper = () => {
  return (
    <>
      <AddPostModal />
      <EditCommentModal />
      <AddCommentModal />
      <EditCommentModal />
      <PostDetailModal />
      <UserModal />
    </>
  );
};

export default ModalWrapper;
