"use client";

import { useState } from "react";
import Button from "../../components/base/Button";
import Notification from "@/src/components/base/Notification";
import { setNotification } from "@/src/reducer/hoa-notificatio.reducer";
import { useDispatch } from "react-redux";
import PortalLayout from "@/src/components/layout/PortalLayout";
import { useRouter } from "next/navigation";
import { useHoaUserResetPasswordMutation } from "@/src/services/hoa-user-login";
import Loader from "@/src/components/base/Loader";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [hoaUserResetPassword, { isLoading, isSuccess, isError }] =
    useHoaUserResetPasswordMutation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reset password logic here
    if (password !== confirmPassword) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);
    // Call the API to reset the password
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      try {
        await hoaUserResetPassword({
          token,
          password,
          confirmPassword,
        }).unwrap();
      } catch (error: any) {
        dispatch(
          setNotification({
            type: "error",
            message: error
              ? error?.data?.error
              : "An error occurred while resetting the password.",
          }),
        );
      }
    } else {
      dispatch(
        setNotification({
          type: "error",
          message: "Invalid or missing token!",
        }),
      );
    }
  };

  const handleNotificationClose = () => {
    setIsFormValid(true);
    dispatch(setNotification({ type: null, message: "" }));
  };

  return (
    <PortalLayout>
      {/* Notification */}
      {!isFormValid && (
        <Notification
          type="error"
          message="Passwords do not match!"
          onClose={handleNotificationClose}
        />
      )}
      {isLoading && <Loader />}
      <div className="max-w-md mx-auto my-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-4">
                  <i className="ri-lock-password-line text-3xl text-purple-600"></i>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Reset Password?
                </h1>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-mail-line text-gray-400"></i>
                      </div>
                    </div>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-mail-line text-gray-400"></i>
                      </div>
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                  <i className="ri-lock-password-line text-3xl text-green-600"></i>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Your password has been successfully updated!
                </h1>
                <p className="text-gray-600 mb-6">
                  Please log in with your new password.
                </p>

                <Button
                  className="w-full"
                  onClick={() => router.push("/login")}
                >
                  Go to Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
