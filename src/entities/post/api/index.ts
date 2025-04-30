import { NewPost, Post, PostRequest } from "../model/post.types";

const addPostApi = async (newPost: NewPost) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    console.error("searchPost Error");
  }

  return await response.json();
};

const getPostApi = async (limit: number, skip: number): Promise<PostRequest> => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`);

  if (!response.ok) {
    console.error("getPost Error");
  }

  return await response.json();
};

const searchPostApi = async (searchQuery: string): Promise<PostRequest> => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`);

  if (!response.ok) {
    console.error("searchPost Error");
  }

  return await response.json();
};

const updatePostApi = async (selectedPost: Post | null) => {
  const response = await fetch(`/api/posts/${selectedPost?.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  });

  if (!response.ok) {
    console.error("searchPost Error");
  }

  return await response.json();
};

const deletePostApi = async (id: number) => {
  await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
};

const fetchPostsByTagApi = async (tag: string) => {
  const response = await fetch(`/api/posts/tag/${tag}`);
  if (!response.ok) {
    console.error("searchPost Error");
  }
  return await response.json();
};
export { addPostApi, getPostApi, searchPostApi, updatePostApi, deletePostApi, fetchPostsByTagApi };
