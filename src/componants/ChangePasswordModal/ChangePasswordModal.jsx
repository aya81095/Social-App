import { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../../context/Auth.context";
import axios from "axios";
import { toast } from "react-toastify";

export default function ChangePasswordModal({ isOpen, onClose, token }) {
  const [showModal, setShowModal] = useState(false);
  const { setToken } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const validationSchemaPassword = yup.object({
    currentPassword: yup
      .string()
      .required("Please enter your current password"),
    newPassword: yup
      .string()
      .required("Please enter your new password")
      .matches(
        passwordRegex,
        "Password must be at least 8 characters, include uppercase, lowercase, number and special character",
      ),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: validationSchemaPassword,
    onSubmit: async (values) => {
      try {
        const options = {
          url: "https://linked-posts.routemisr.com/users/change-password",
          method: "PATCH",
          headers: {
            token,
          },
          data: {
            password: values.currentPassword,
            newPassword: values.newPassword,
          },
        };
        const { data } = await axios.request(options);
        if (data.message === "success") {
          toast.success("Password changed successfully!");
          console.log(data);
          if (data.token) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
          }
          formik.resetForm();
          onClose();
        }
      } catch (error) {
        toast.error("Failed to change password. Please try again.");
        setError(error.response.data.error);
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 transition-opacity duration-300">
      <div
        className={`bg-white rounded-lg p-6 w-full max-w-md shadow-lg transform transition-all duration-300 ${
          showModal ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <h2 className="text-xl font-bold mb-4 text-sky-700 flex items-center gap-2">
          <i className="fa-solid fa-lock"></i>
          Change Password
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 transition-colors duration-200"
            />
            {formik.errors.currentPassword &&
              formik.touched.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.currentPassword}
                </p>
              )}
          </div>

          <div>
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 transition-colors duration-200"
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.newPassword}
              </p>
            )}
          </div>

          {error ? (
            <div className="text-red-500 text-center">*{error}</div>
          ) : (
            ""
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                formik.resetForm();
              }}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={formik.handleSubmit}
              type="button"
              className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition-colors duration-200"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
