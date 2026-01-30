import { useState, useRef, useEffect, use } from "react";
import commentAvatar from "../../assets/images/comment-avatar.webp";
import useDeleteComment from "./../../hooks/useDeleteComment";
import { toast } from "react-toastify";
import { useUser } from "../../context/userContext";
import useCreateComment from "./../../hooks/useCreateComment";

export default function CommentCard({ commentInfo, setAllComments, postInfo }) {
  const { deleteComment, isDeleting } = useDeleteComment();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { userData } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(commentInfo.content);
  const { updateComment } = useCreateComment();

  // ^ update comment
  const handleUpdate = async () => {
    try {
      await updateComment({
        commentId: commentInfo._id,
        content: editedContent,
      });
      setAllComments((prev) =>
        prev.map((comment) =>
          comment._id === commentInfo._id
            ? { ...comment, content: editedContent }
            : comment,
        ),
      );
      setIsEditing(false);
      setMenuOpen(false);
    } catch (error) {
      toast.error("Failed to update comment. Please try again.");
    }
  };

  // ^ delete comment
  const handleDelete = async () => {
    try {
      const deletedId = await deleteComment(commentInfo._id);
      toast.success("Comment deleted successfully");

      setAllComments((prev) =>
        prev.filter((comment) => comment._id !== deletedId),
      );
    } catch (error) {
      toast.error("Failed to delete comment. Please try again.");
    }

    setMenuOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <article className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 mb-2.5 mt-4 relative">
      <header className="flex items-start gap-3">
        <img
          src={
            commentInfo.commentCreator?.photo?.includes("undefined")
              ? commentAvatar
              : commentInfo.commentCreator?.photo
          }
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover ring-1 ring-gray bg-white"
        />

        <div className="flex-1">
          <div className="flex items-center gap-2 relative">
            <span className="text-sm font-semibold text-gray-700">
              {commentInfo.commentCreator?.name}
            </span>

            <span className="text-xs text-gray-400">•</span>

            <span className="text-xs text-gray-400 ">
              {new Date(commentInfo.createdAt).toLocaleTimeString()}
            </span>

            {/* Dropdown menu button */}
            {postInfo.user?._id === userData?._id && (
              <div className="ml-auto relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-gray-600 text-xl hover:text-gray-800 focus:outline-none hover:bg-gray-100 rounded-full size-8 flex items-center justify-center my-auto"
                >
                  <i class="fa-solid fa-ellipsis"></i>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded shadow-md w-40 z-10">
                    <div
                      onClick={() => {
                        setIsEditing(true);
                        setEditedContent(commentInfo.content);
                        setMenuOpen(false);
                      }}
                      className="px-3 py-2 text-sm text-blue-500 hover:bg-gray-100 cursor-pointer"
                    >
                      <i class="fa-regular fa-pen-to-square"></i>
                      Edit Comment
                    </div>
                    <div
                      onClick={handleDelete}
                      className="px-3 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
                    >
                      <i class="fa-solid fa-trash"></i>
                      Delete Comment
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {isEditing ? (
            <>
              <input
                type="text"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="mt-2 text-gray-700 text-sm leading-relaxed border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-colors duration-200"
              />
              <div className="buttons">
                <button
                  onClick={handleUpdate}
                  className="mt-2 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition-colors text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedContent(commentInfo.content);
                  }}
                  className="mt-2 ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p className="mt-2 text-gray-700 text-sm leading-relaxed">
              {commentInfo.content}
            </p>
          )}
        </div>
      </header>
    </article>
  );
}
