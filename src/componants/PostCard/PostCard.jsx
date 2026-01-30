import avatarImage from "../../assets/images/avatar.png";
import commentAvatar from "../../assets/images/comment-avatar.webp";
import CommentCard from "../CommentCard/CommentCard";
import { Link } from "react-router";
import useCreateComment from "./../../hooks/useCreateComment";
import { useFormik } from "formik";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "./../../context/Auth.context";
import { toast } from "react-toastify";
import { useUser } from "../../context/userContext";
import UpdatePostModal from "./../updatePostModal/updatePostModal";

export default function PostCard({
  postInfo,
  commentsLimit = 1,
  onDelete,
  getAllPosts,
  getUserPosts,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { user } = useContext(AuthContext);
  const { userData } = useUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);

  //^ update post
  const handleUpdate = () => {
    setPostToEdit(postInfo);
    setIsEditModalOpen(true);
    setMenuOpen(false);
  };

  // * delete post
  const handleDelete = async () => {
    try {
      const data = await onDelete(postInfo._id);
      toast.success("Post deleted successfully");
      setMenuOpen(false);
      getAllPosts();
      getUserPosts(userData._id);
    } catch (error) {
      toast.error("Failed to delete post. Please try again.");
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //^ Comments state
  const [allComments, setAllComments] = useState(postInfo.comments || []);
  const [showAllComments, setShowAllComments] = useState(false);

  //^ Create comment
  const { createComment } = useCreateComment();
  const formik = useFormik({
    initialValues: { content: "" },
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await createComment({
          content: values.content,
          postId: postInfo._id,
        });

        const newComment = {
          _id: data._id || Date.now().toString(),
          content: data.content || values.content,
          createdAt: data.createdAt || new Date().toISOString(),
          commentCreator: {
            _id: userData?._id || user?._id || "unknown",
            name: userData?.name || user?.name || "Unknown User",
            photo: userData?.photo || user?.photo || commentAvatar,
          },
        };

        setAllComments((prev) => [newComment, ...prev]);
        resetForm();
      } catch (error) {
        console.error("Failed to create comment:", error);
      }
    },
  });

  return (
    <article className="max-w-2xl w-full border border-sky-200 rounded-2xl px-6 py-3 mb-2.5 mt-8 bg-white shadow-sm hover:shadow-lg">
      {/* User header */}
      <header className="flex items-center gap-4 border-b border-sky-200 pb-4">
        <img
          src={
            postInfo.user?.photo?.includes("undefined")
              ? avatarImage
              : postInfo.user?.photo || avatarImage
          }
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover ring-1 ring-sky-200"
        />
        <Link to={`/Home/${postInfo.id}`} className="flex flex-col">
          <div className="text-md font-semibold text-gray-700">
            {postInfo.user?.name || "Unknown User"}
          </div>
          <span className="text-xs text-gray-400">
            {new Date(postInfo.createdAt).toDateString()}
          </span>
        </Link>
        {/* Dropdown */}
        {userData?._id === postInfo.user?._id && (
          <div className="ml-auto relative " ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 text-2xl hover:text-gray-800 focus:outline-none hover:bg-sky-100/50 rounded-full size-8 flex items-center justify-center my-auto"
            >
              <i class="fa-solid fa-ellipsis"></i>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded shadow-md w-36 z-10">
                <div
                  onClick={handleUpdate}
                  className="px-3 py-2 text-sm text-blue-500 hover:bg-gray-100 cursor-pointer"
                >
                  <i class="fa-regular fa-pen-to-square"></i>
                  Edit Post
                </div>
                <div
                  onClick={handleDelete}
                  className="px-3 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
                >
                  <i class="fa-solid fa-trash"></i>
                  Delete Post
                </div>
              </div>
            )}
          </div>
        )}
      </header>
      {/* Post content */}
      <div className="mt-4 text-gray-700 leading-relaxed">{postInfo.body}</div>
      {postInfo.image && (
        <div className="mt-4">
          <img
            src={postInfo.image}
            alt="Post media"
            className="w-full rounded-lg object-cover"
          />
        </div>
      )}
      {/* Actions */}
      <footer className="mt-4 flex items-center justify-between text-gray-500 border-y border-sky-200 py-4">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 focus:outline-none">
            <i className="fa-regular fa-heart text-lg text-gray-500 hover:scale-120 transition-transform duration-200"></i>
          </button>
          <button className="flex items-center gap-2 text-sm focus:outline-none">
            <i className="fa-regular fa-comment-dots text-lg text-gray-500 hover:scale-120 transition-transform duration-200"></i>
          </button>
          <button
            className="flex items-center gap-2 text-sm focus:outline-none"
            title="Share"
          >
            <i className="fa-solid fa-share-nodes text-lg text-gray-500 hover:scale-120 transition-transform duration-200"></i>
          </button>
        </div>
        <div
          onClick={() => {
            setShowAllComments((prev) => !prev);
          }}
          className="cursor-pointer text-md text-gray-500 hover:text-gray-800"
        >
          {allComments.length} Comments
        </div>
      </footer>
      {/* Add comment */}
      <form
        className="commentInput w-full flex justify-between mt-4 items-center"
        onSubmit={formik.handleSubmit}
      >
        <input
          type="text"
          placeholder="Write a comment..."
          className="p-2 border border-sky-200 rounded-full w-88/100 text-sm focus:outline-none focus:border-sky-200 focus:ring-1 focus:ring-sky-200 transition-colors duration-200"
          name="content"
          id="content"
          value={formik.values.content}
          onChange={formik.handleChange}
        />
        <button
          type="submit"
          className="py-2 px-3 bg-sky-600 text-white rounded-full hover:bg-sky-700"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
      {/* Comments Section */}
      {allComments.length === 0 ? (
        <div className="text-gray-500 text-sm mt-2 text-center">
          No comments yet.
        </div>
      ) : (
        (showAllComments
          ? allComments
          : allComments.slice(0, commentsLimit)
        ).map((comment) => (
          <CommentCard
            key={comment._id}
            commentInfo={comment}
            setAllComments={setAllComments}
            postInfo={postInfo}
          />
        ))
      )}
      {isEditModalOpen && (
        <UpdatePostModal
          post={postToEdit}
          isEdit={true}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          refreshPosts={() => {
            getAllPosts();
            getUserPosts(userData._id);
          }}
        />
      )}
    </article>
  );
}
