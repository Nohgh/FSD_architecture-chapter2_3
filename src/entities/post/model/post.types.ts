import { User } from "@/entities/user/model/user.types";

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions?: {
    likes?: number;
    dislikes?: number;
  };
  userId: number;
  author: User;
}

export type NewPost = Pick<Post, "title" | "body" | "userId">;
