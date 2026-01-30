import { useContext, useState } from "react";
import avatarImage from "../../assets/images/avatar.png";
import { AuthContext } from "./../../context/Auth.context";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../../context/userContext";

export default function UploadPost({
  getAllPosts,
  getUserPosts,
  isEdit = false,
  onClose,
  initialData,
  onSubmitOverride,
  previewImage: propPreviewImage,
  setPreviewImage: propSetPreviewImage,
}) {
  const { token } = useContext(AuthContext);
  const { userData } = useUser();

  const [internalPreviewImage, internalSetPreviewImage] = useState(
    initialData?.image || null,
  );

  const previewImage = propPreviewImage ?? internalPreviewImage;
  const setPreviewImage = propSetPreviewImage ?? internalSetPreviewImage;

  const validationSchema = yup.object({
    body: yup
      .string()
      .required("body is required")
      .min(2, "body must be at least 2 characters")
      .max(500, "body must be at most 500 characters"),

    image: yup
      .mixed()
      .nullable()
      .test("fileSize", "File is too large (max : 5MB)", (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024;
      })
      .test("fileType", "only image files are allowed", (file) => {
        if (!file) return true;
        const supportedTypes = [
          "image/jpg",
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        return supportedTypes.includes(file.type);
      }),
  });

  const formik = useFormik({
    initialValues: {
      body: initialData?.body || "",
      image: null,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      if (isEdit && onSubmitOverride) {
        return onSubmitOverride(values, formik, setPreviewImage);
      }

      try {
        const formData = new FormData();
        formData.append("body", values.body);
        if (values.image) formData.append("image", values.image);

        const options = {
          url: "https://linked-posts.routemisr.com/posts",
          method: "POST",
          headers: { token },
          data: formData,
        };

        const { data } = await axios.request(options);

        if (data.message === "success") {
          toast.success("Post uploaded successfully!");
          formik.resetForm();
          setPreviewImage(null);
          getUserPosts(userData._id);
          getAllPosts();
        }
      } catch (error) {
        toast.error("Failed to upload post. Please try again.");
        console.log(error);
      }
    },
  });

  return (
    <article
      className={`relative w-full max-w-2xl border border-sky-200 rounded-2xl p-4 mt-2 bg-sky-50/80 shadow-lg ${
        isEdit ? "bg-white" : ""
      }`}
    >
      <header className="flex items-center gap-3">
        <img
          src={userData?.photo || avatarImage}
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover ring-1 ring-sky-200 bg-white"
        />
        <div>
          <div className="text-sm font-semibold text-gray-700">
            {userData?.name}
          </div>
          <div className="text-xs text-gray-400">
            Share something with your followers
          </div>
        </div>
        {isEdit && onClose && (
          <div
            className="close bg-red-50 text-red-600 rounded-full size-7 cursor-pointer absolute top-2 right-2 flex items-center justify-center"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        )}
      </header>

      <form className="mt-4 space-y-3" onSubmit={formik.handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          rows={3}
          name="body"
          id="body"
          className="w-full border border-sky-200 rounded-md p-3 text-sm text-gray-700 resize-none bg-white focus:outline-none focus:border-sky-200 focus:ring-1 focus:ring-sky-200 transition-colors duration-200"
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.body && formik.touched.body && (
          <p className="text-red-500 -mt-2">*{formik.errors.body}</p>
        )}

        {previewImage && (
          <div className="preview relative lg:w-80 lg:h-56 w-60 h-48 rounded-2xl overflow-hidden">
            <img
              src={previewImage}
              alt="preview image"
              className="w-full h-full object-cover"
            />
            <div
              className="close bg-red-50 text-red-500 rounded-full size-7 cursor-pointer absolute top-2 right-2 flex items-center justify-center"
              onClick={() => {
                setPreviewImage(null);
                formik.setFieldValue("image", null);
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer w-fit px-4 py-2 bg-sky-600 text-white rounded-md shadow hover:bg-sky-700">
            <input
              type="file"
              className="hidden"
              name="image"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                formik.setFieldValue("image", file);
                const url = URL.createObjectURL(file);
                setPreviewImage(url);
              }}
              onBlur={formik.handleBlur}
            />
            <span className="inline-flex items-center gap-2">
              <i className="fa-solid fa-image"></i> Choose Image
            </span>
          </label>

          <button
            type="submit"
            className="px-4 py-2 bg-sky-600 text-white rounded-md shadow hover:bg-sky-700"
          >
            {formik.isSubmitting
              ? isEdit
                ? "Updating"
                : "Posting"
              : isEdit
                ? "Update"
                : "Post"}
          </button>
        </div>

        {formik.errors.image && formik.touched.image && (
          <p className="text-red-500 -mt-2">*{formik.errors.image}</p>
        )}
      </form>
    </article>
  );
}
