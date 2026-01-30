import { useFormik } from "formik";
import * as yup from "yup";
import { data, Link, useNavigate } from "react-router";
import create from "./../../../node_modules/lodash-es/create";
import { toast } from "react-toastify";
import { use, useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const [accountIsExist, setAccountIsExist] = useState(null);
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const signupSchema = yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(2, "name must be at least 2 characters")
      .max(20, "name must be at most 20 characters"),
    email: yup
      .string()
      .required("email is required")
      .email("invalid email format"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        passwordRegex,
        "password must be at least 8 characters, and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    rePassword: yup
      .string()
      .required("please confirm your password")
      .oneOf([yup.ref("password")], "confirm password must match password"),
    dateOfBirth: yup.string().required("date of birth is required"),
    gender: yup
      .string()
      .required("gender is required")
      .oneOf(["male", "female"], "please select a valid gender"),
  });

  async function handleSubmit(values) {
    try {
      const options = {
        url: "https://linked-posts.routemisr.com/users/signup",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);
      if (data.message === "success") {
        toast.success("Account created successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Signup failed. Please try again.");
      setAccountIsExist(error.response.data.error);
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    validationSchema: signupSchema,
    onSubmit: handleSubmit,
  });

  console.log(formik);

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
          {/* Illustration Section - New Design */}
          <div className="min-h-screen hidden md:block relative rounded-3xl overflow-hidden bg-linear-to-br from-sky-600 to-sky-600 p-12">
            {/* Decorative circles */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white">
              {/* Icon */}
              <div className="mb-8 w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>

              {/* Text */}
              <h2 className="text-4xl font-bold mb-4">Secure & Easy Access</h2>
              <p className="text-lg text-blue-100 max-w-md mb-8">
                Create an account and enjoy seamless access to all your favorite
                features
              </p>

              {/* Features */}
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-lg">End-to-end encryption</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-lg">Two-factor authentication</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-lg">24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
          {/* Login Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
            {/* LOGO */}
            <Link
              to=""
              className="flex items-center gap-3 md:hidden mb-6 align-center justify-center"
            >
              <div className="w-12 h-12 rounded-md bg-sky-600 flex items-center justify-center text-white font-extrabold text-2xl">
                V
              </div>
              <span className="text-2xl font-semibold text-sky-600">
                VibeApp
              </span>
            </Link>
            {/* Welcome Text */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
            <p className="text-gray-600 mb-6">
              Already have an account?{" "}
              <Link to="/login" className="text-sky-600 hover:underline">
                Login
              </Link>
            </p>

            {/* Form */}
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  name="name"
                  id="name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.name && formik.touched.name ? (
                  <p className="text-red-500">*{formik.errors.name}</p>
                ) : (
                  ""
                )}
              </div>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.email && formik.touched.email ? (
                  <p className="text-red-500">*{formik.errors.email}</p>
                ) : (
                  ""
                )}
                {accountIsExist ? (
                  <p className="text-red-500">*{accountIsExist}</p>
                ) : (
                  ""
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.password && formik.touched.password ? (
                  <p className="text-red-500">*{formik.errors.password}</p>
                ) : (
                  ""
                )}
              </div>
              {/* Re-Password */}
              <div>
                <label
                  htmlFor="rePass"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Re-Password
                </label>
                <input
                  type="password"
                  id="rePass"
                  name="rePassword"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.rePassword && formik.touched.rePassword ? (
                  <p className="text-red-500">*{formik.errors.rePassword}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 grow-cols-1 ">
                {/* Date of Birth */}
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your DateOfBirth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? (
                    <p className="text-red-500">*{formik.errors.dateOfBirth}</p>
                  ) : (
                    ""
                  )}
                </div>
                {/* Gender */}
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {formik.errors.gender && formik.touched.gender ? (
                    <p className="text-red-500">*{formik.errors.gender}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* Divider with OR */}
              <div className="relative py-2">
                <span className="block text-center text-gray-500 text-sm relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[calc(50%-20px)] before:h-px before:bg-gray-300 after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[calc(50%-20px)] after:h-px after:bg-gray-300">
                  or
                </span>
              </div>

              {/* Social Login Buttons */}
              <button
                type="button"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </button>

              <button
                type="button"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Sign up with Apple
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                className="disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-sky-600 w-full bg-sky-600 text-white py-3 rounded-lg font-medium hover:bg-sky-700 transition"
              >
                {formik.isSubmitting
                  ? "Creating your account..."
                  : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
