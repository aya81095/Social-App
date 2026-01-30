import { useContext } from "react";
import { AuthContext } from "./../context/Auth.context";
import axios from "axios";
import { toast } from "react-toastify";

export default function useCreateComment() {
  const { token } = useContext(AuthContext);
  async function createComment({ content, postId }) {
    try {
      const options = {
        url: "https://linked-posts.routemisr.com/comments",
        method: "POST",
        headers: {
          token,
        },
        data: {
          content,
          post: postId,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      if (data.message === "success") {
        console.log(data);
        toast.success("comment added successfully");
        return data;
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add comment. Please try again.");
    }
  }

  async function updateComment({ commentId, content }) {
    try {
      const options = {
        url: `https://linked-posts.routemisr.com/comments/${commentId}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          content,
        },
      };
      const { data } = await axios.request(options);
      console.log(data);
      if (data.message === "success") {
        console.log(data);
        toast.success("comment updated successfully");
        console.log(commentId);

        return data;
      }
    } catch (error) {
      toast.error("Failed to update comment. Please try again.");
      console.log(error);
      console.log(commentId);
    }
  }

  return { createComment, updateComment };
}
