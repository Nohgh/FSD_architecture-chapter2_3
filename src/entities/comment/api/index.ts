import { API } from "@/shared/lib/apiMode";
import { Comment, FetchComment, NewComment } from "../model/comment.type";

const fetchCommentsApi = async (postId: number): Promise<FetchComment> => {
  const response = await fetch(`${API}/comments/post/${postId}`);

  if (!response.ok) {
    console.error("searchPost Error");
  }

  return await response.json();
};

const addCommentApi = async (newComment: NewComment) => {
  const response = await fetch(`${API}/comments/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  });

  if (!response.ok) {
    console.error("searchPost Error");
  }

  return await response.json();
};

const updateCommentApi = async (selectedComment: Comment | null) => {
  const response = await fetch(`${API}/comments/${selectedComment?.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: selectedComment?.body }),
  });

  if (!response.ok) {
    console.error("searchPost Error");
  }

  return await response.json();
};

const deleteCommentApi = async (id: number) => {
  await fetch(`${API}/comments/${id}`, {
    method: "DELETE",
  });
};

const likeCommentApi = async (id: number, targetComment: Comment) => {
  const response = await fetch(`${API}/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: targetComment.likes + 1 }),
  });

  if (!response.ok) {
    console.error("searchPost Error");
  }

  return await response.json();
};
export { fetchCommentsApi, addCommentApi, updateCommentApi, deleteCommentApi, likeCommentApi };
