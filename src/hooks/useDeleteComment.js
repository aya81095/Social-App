import axios from "axios";
import { useState } from "react";
import { AuthContext } from "./../context/Auth.context";
import { useContext } from "react";

export default function useDeleteComment() {
  const { token } = useContext(AuthContext);
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteComment(commentId) {
    try {
      setIsDeleting(true);
      console.log(commentId);

      await axios.delete(
        `https://linked-posts.routemisr.com/comments/${commentId}`,
        {
          headers: {
            token,
          },
        },
      );

      return commentId;
    } finally {
      setIsDeleting(false);
    }
  }

  return { deleteComment, isDeleting };
}
