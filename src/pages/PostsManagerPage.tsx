import { Card as PostManage } from "../shared/ui";
import PostHeader from "@/features/post/ui/PostHeader";
import PostContent from "@/widgets/post/PostContent";
import ModalWrapper from "@/widgets/modal/ModalWrapper";
import usePostManager from "@/features/post/model/usePostManager";

const PostsManager = () => {
  usePostManager();

  return (
    <PostManage className="w-full max-w-6xl mx-auto">
      <PostHeader />
      <PostContent />
      <ModalWrapper />
    </PostManage>
  );
};

export default PostsManager;
