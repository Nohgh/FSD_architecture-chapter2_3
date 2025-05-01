import { Table } from "@/shared/ui";
import PostTableHeader from "@/features/post/ui/PostTableHeader";
import PostTableBody from "@/features/post/ui/PostTableBody";

const PostTable = () => {
  return (
    <Table>
      <PostTableHeader />
      <PostTableBody />
    </Table>
  );
};

export default PostTable;
