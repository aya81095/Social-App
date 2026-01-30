import { useState, useContext, useEffect } from "react";
import UploadPost from "../UploadPost/UploadPost";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/Auth.context";

export default function UpdatePostModal({
  post,
  isOpen,
  onClose,
  refreshPosts,
}) {
  const { token } = useContext(AuthContext);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (post?.image) {
      setPreviewImage(post.image);
    } else {
      setPreviewImage(null);
    }
  }, [post]);

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <UploadPost
        isEdit={true}
        initialData={post}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        onClose={onClose}
        onSubmitOverride={async (values, formik) => {
          try {
            const formData = new FormData();
            formData.append("body", values.body);

            if (values.image) {
              formData.append("image", values.image);
            }

            const { data } = await axios.put(
              `https://linked-posts.routemisr.com/posts/${post._id}`,
              formData,
              {
                headers: { token },
              },
            );

            if (data.message === "success") {
              toast.success("Post updated successfully!");
              onClose();
              refreshPosts && refreshPosts();
            }
          } catch (error) {
            toast.error("Failed to update post. Please try again.");
            console.log(error);
          }
        }}
      />
    </div>
  );
}
