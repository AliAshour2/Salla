import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { validationSchema } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "@/features/auth/thunks/authThunks";
import InputField from "./InputField";
import { AppDispatch, RootState } from "@/app/store";
import { useState } from "react";
import { clearError } from "@/features/auth/slices/authSlice";
import SuccessAlert from "@/components/shared/SuccessAlert";
import ErrorAlert from "@/components/shared/ErrorAlert";
import { useTranslation } from "react-i18next";

const ForgetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { status, error, message } = useSelector(
    (state: RootState) => state.auth
  );
  const [isOpen, setIsOpen] = useState(false);
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const forgetPasswordForm = useFormik({
    initialValues: { email: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(forgetPassword(values.email));
      forgetPasswordForm.resetForm();
    },
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      dispatch(clearError()); // Clear error when dialog opens
    }
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium">
        {t("forgetPassword.forgotPassword")}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h2 className="block text-2xl font-bold text-gray-800">
                {t("forgetPassword.forgotPassword")}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                {t("forgetPassword.rememberPassword")}
                  <Link
                    to={""}
                    className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
                  >
                    {t("forgetPassword.signInHere")}
                  </Link>
                </p>
              </div>
              <div className="mt-5">
                {/* Form */}
                <form onSubmit={forgetPasswordForm.handleSubmit}>
                  <div className="grid gap-y-4">
                    {/* Form Group */}
                    <InputField
                      id="email"
                      name="email"
                      label={t("forgetPassword.email")}
                      type="email"
                      placeholder="Enter your email"
                      onChange={forgetPasswordForm.handleChange}
                      onBlur={forgetPasswordForm.handleBlur}
                      value={forgetPasswordForm.values.email}
                      error={forgetPasswordForm.errors.email}
                      touched={forgetPasswordForm.touched.email}
                    />
                    {/* End Form Group */}
                    <button
                      type="submit"
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {status == "loading" ? (
                        <i className="fa fa-spinner fa-spin"></i>
                      ) : (
                        t("forgetPassword.continue")
                      )}
                    </button>
                  </div>
                </form>
                {/* End Form */}
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("forgetPassword.cancel")}</AlertDialogCancel>

            {status == "succeeded" && message && (
              <SuccessAlert message={message} />
            )}
          </AlertDialogFooter>

          {error && <ErrorAlert title="Forgot password error!" error={error} />}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ForgetPassword;
