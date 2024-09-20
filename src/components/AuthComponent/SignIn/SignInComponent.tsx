import { useFormik } from "formik";
import { validationSchema } from "./validationSchemas";
import GoogleAuthButton from "@/components/ui/googleAuthButton";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";
import { loginUser } from "@/features/auth/thunks/authThunks";

interface SignUpComponentProps {
  onSwitch: () => void;
}

const SignInComponent = ({ onSwitch }: SignUpComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const signInForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // dispatch login user thunk with form values
      dispatch(loginUser(values));
    },
  });

  return (
    <div className="animate-scale-up-center mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account yet?
          </p>
          <button
            className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
            onClick={onSwitch}
          >
            Sign up here
          </button>
        </div>
        <div className="mt-5">
          <GoogleAuthButton />

          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
            Or
          </div>

          <form onSubmit={signInForm.handleSubmit}>
            <div className="grid gap-y-4">
              <InputField
                id="email"
                name="email"
                label="Email"
                type="email"
                placeholder="Email"
                onChange={signInForm.handleChange}
                onBlur={signInForm.handleBlur}
                value={signInForm.values.email}
                error={signInForm.errors.email}
                touched={signInForm.touched.email}
              />

              <div className="relative">
                <InputField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  onChange={signInForm.handleChange}
                  onBlur={signInForm.handleBlur}
                  value={signInForm.values.password}
                  error={signInForm.errors.password}
                  touched={signInForm.touched.password}
                />

                <p   className="absolute inset-y-0 end-0 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium">
                  Forgot password?
                </p>
              </div>
              <div className="flex items-center">
                <div className="flex">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ms-3">
                  <label htmlFor="remember-me" className="text-sm">
                    Remember me
                  </label>
                </div>
              </div>
              {/* End Checkbox */}
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                {status === "loading" ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Sign in"
                )}
              </button>

              {error && (
                <Alert  variant="destructive">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Sign in error!</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
