import { Table } from "@/shared/ui";
import PostTableHeader from "./PostTableHeader";
import PostTableBody from "./PostTableBody";

const PostTable = () => {
  return (
    <Table>
      <PostTableHeader />
      <PostTableBody />
    </Table>
  );
};

export default PostTable;
