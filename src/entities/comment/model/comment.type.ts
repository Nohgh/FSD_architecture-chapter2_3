import { User } from "@/entities/user/model/user.types";

export interface Comment {
  id: number;
  postId: number | null;
  user: {
    username: string;
  };
  body: string;
  likes: number;
  userId?: User["id"];
}

export type NewComment = Pick<Comment, "body" | "postId" | "userId">;
