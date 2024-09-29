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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, Terminal } from "lucide-react";
import { useState } from "react";


const ForgetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error  , message} = useSelector((state: RootState) => state.auth);
  const [isOpen , setIsOpen] = useState(false);
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const forgetPasswordForm = useFormik({
    initialValues: { email: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
       dispatch(forgetPassword(values.email));
     
    },
  });

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}  >
        <AlertDialogTrigger className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium">
          Forgot password?
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h2 className="block text-2xl font-bold text-gray-800">
                  Forgot password?
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Remember your password?
                  <Link
                    to={""}
                    className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
                  >
                    Sign in here
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
                      label="email"
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
                        "Continue"
                      )}
                    </button>
                  </div>
                </form>
                {/* End Form */}
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            {status == "succeeded" && message && (
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
          </AlertDialogFooter>
          {error && (
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Error reset password!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ForgetPassword;
