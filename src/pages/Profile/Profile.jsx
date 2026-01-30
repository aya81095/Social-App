import NavBar from "../../componants/NavBar/NavBar";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./../../context/Auth.context";
import imageAvatar from "../../assets/images/avatar.png";
import PostCard from "./../../componants/PostCard/PostCard";
import UploadPost from "../../componants/UploadPost/UploadPost";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import usePosts from "../../hooks/usePosts";
import { useUser } from "../../context/userContext";
import ChangePasswordModal from "../../componants/ChangePasswordModal/ChangePasswordModal";

export default function Profile() {
  const { userData, setUserData, getUserData, updateProfilePhoto } = useUser();
  const { token } = useContext(AuthContext);
  const { deletePost, getUserPosts, userNewPosts } = usePosts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getAllPosts } = usePosts();

  // * Get User Data

  useEffect(() => {
    getUserData();
  }, []);
  console.log(userData);

  // * get user posts
  useEffect(() => {
    if (userData?._id) {
      getUserPosts(userData._id);
    }
  }, [userData]);

  //^ change profile picture

  const validationSchema = yup.object({
    image: yup
      .mixed()
      .test("fileSize", "File is too large (max : 4MB)", (file) => {
        if (!file) return true;
        return file.size <= 4 * 1024 * 1024;
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

  async function handleSubmit(values) {
    try {
      const formData = new FormData();
      formData.append("photo", values.photo);

      const options = {
        url: "https://linked-posts.routemisr.com/users/upload-photo",
        method: "PUT",
        headers: {
          token,
        },
        data: formData,
      };

      const { data } = await axios.request(options);
      if (data.message === "success") {
        toast.success("Profile picture updated successfully!");
        formik.resetForm();
        getUserData();
        console.log(data);
      }
    } catch (error) {
      toast.error("Failed to update profile picture. Please try again.");
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      photo: null,
    },

    validationSchema,

    onSubmit: handleSubmit,
  });

  return (
    <>
      <NavBar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <main className="max-w-2xl w-full mx-auto space-y-6">
          {/* Cover Photo */}
          <div className="relative h-48 bg-linear-to-r from-sky-500 to-sky-600 rounded-t-2xl overflow-hidden">
            {userData?.coverPhoto && (
              <img
                src={userData?.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Profile Card */}
          <div className="bg-white border border-sky-200 rounded-b-2xl shadow-lg p-6 -mt-16 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-6 ">
              <img
                src={userData?.photo || imageAvatar}
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg hover:shadow-xl transition-shadow"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {userData?.name || "Unknown User"}
                </h1>
                <p className="text-lg text-gray-600">
                  @{userData?.name || "unknown"}
                </p>
                <p className="text-gray-700 mt-2 max-w-md">
                  {userData?.bio || "No bio available."}
                </p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
              <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md">
                <div className="text-2xl font-bold text-sky-600">
                  {userNewPosts.length}
                </div>
                <div className="text-sm text-gray-600 font-medium">Posts</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md">
                <div className="text-2xl font-bold text-sky-600">0</div>
                <div className="text-sm text-gray-600 font-medium">
                  Followers
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md">
                <div className="text-2xl font-bold text-sky-600">0</div>
                <div className="text-sm text-gray-600 font-medium">
                  Following
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700">
                <i class="fa-solid fa-location-dot text-sky-600"></i>
                <span>{userData?.location || "No location available."}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <i class="fa-regular fa-calendar text-sky-600"></i>
                <span>{userData?.dateOfBirth}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <i class="fa-solid fa-venus-mars text-sky-600"></i>
                <span>{userData?.gender}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <i class="fa-solid fa-right-to-bracket text-sky-600"></i>
                <span>
                  Joined{" "}
                  {new Date(userData?.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            {/* horizontal line */}
            <hr className="border-t border-gray-300 my-6" />

            <form onSubmit={formik.handleSubmit}>
              <div className="editInfo flex gap-4 justify-center items-center flex-col sm:flex-row">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    id="photo"
                    name="photo"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (file) {
                        formik.setFieldValue("photo", file);
                        formik.handleSubmit();
                      }
                    }}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    type="submit"
                    className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-2 rounded-lg hover:shadow-md font-medium"
                  >
                    <i class="fa-solid fa-image"></i>
                    Change Profile Picture
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="cursor-pointer inline-flex items-center gap-2  bg-sky-600 text-white sm-px-6 py-2 px-10 rounded-lg hover:shadow-md font-medium"
                >
                  <i class="fa-solid fa-lock"></i>
                  Change Password
                </button>
                <ChangePasswordModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  token={token}
                />
              </div>
              {formik.errors.photo && formik.touched.photo ? (
                <p className="text-red-500">*{formik.errors.image}</p>
              ) : (
                ""
              )}
            </form>
          </div>

          {/* upload post */}
          <UploadPost getAllPosts={getAllPosts} getUserPosts={getUserPosts} />

          {/* Recent Posts Section */}
          <div className="bg-white border border-sky-200 rounded-2xl shadow-lg py-6 px-1 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Posts
            </h2>
            <div className="space-y-4">
              {userNewPosts.length > 0 ? (
                [...userNewPosts]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((post) => (
                    <PostCard
                      key={post._id}
                      postInfo={post}
                      onDelete={deletePost}
                      getAllPosts={getAllPosts}
                      getUserPosts={getUserPosts}
                    />
                  ))
              ) : (
                <p className="text-gray-500">No posts available.</p>
              )}
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
