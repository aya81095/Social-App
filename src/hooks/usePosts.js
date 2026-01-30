import axios from "axios";
import { useState, useEffect, useContext, use } from "react";
import { AuthContext } from "../context/Auth.context";

export default function usePosts() {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userNewPosts, setNewUserPosts] = useState([]);

  // ^ Get All Posts
  async function getAllPosts() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt",
        { headers: { token } },
      );
      setPosts(data.posts);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // ^ Delete Post
  async function deletePost(postId) {
    const { data } = await axios.delete(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      {
        headers: { token },
      },
    );
    console.log(data);

    setPosts((prev) => prev.filter((post) => post._id !== postId));
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  // ^ Get User Posts
  async function getUserPosts(userId) {
    try {
      const { data } = await axios.get(
        `https://linked-posts.routemisr.com/users/${userId}/posts?limit=100`,
        {
          headers: { token },
        },
      );
      setNewUserPosts(data.posts);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    posts,
    loading,
    deletePost,
    getAllPosts,
    userNewPosts,
    getUserPosts,
  };
}
