import GoogleAuthButton from "@/components/ui/googleAuthButton";
import { useFormik } from "formik";
import InputField from "./InputField";
import { validationSchema } from "./validationSchemas";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { registerUser } from "@/features/auth/thunks/authThunks";
import ErrorAlert from "@/components/shared/ErrorAlert";


interface SignUpComponentProps {
  onSwitch: () => void;
}

const SignUpComponent = ({ onSwitch }: SignUpComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // dispatch register user thunk with form values
      dispatch(registerUser(values));
    },
  });

  return (
    <div className="animate-scale-up-center mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?
            <button
              className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
              onClick={onSwitch}
            >
              Sign in here
            </button>
          </p>
        </div>
        <div className="mt-5">
          <GoogleAuthButton />
          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
            Or
          </div>
          <form onSubmit={registerForm.handleSubmit}>
            <div className="grid  gap-y-4">
              <InputField
                id="name"
                label="Name"
                name="name"
                type="text"
                value={registerForm.values.name}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
                error={registerForm.errors.name}
                touched={registerForm.touched.name}
              />
              <InputField
                id="email"
                label="Email address"
                name="email"
                type="email"
                value={registerForm.values.email}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
                error={registerForm.errors.email}
                touched={registerForm.touched.email}
              />
              <InputField
                id="password"
                label="Password"
                name="password"
                type="password"
                value={registerForm.values.password}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
                error={registerForm.errors.password}
                touched={registerForm.touched.password}
              />
              <InputField
                id="rePassword"
                label="Confirm Password"
                name="rePassword"
                type="password"
                value={registerForm.values.rePassword}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
                error={registerForm.errors.rePassword}
                touched={registerForm.touched.rePassword}
              />
              <InputField
                id="phone"
                label="Phone"
                name="phone"
                type="tel"
                value={registerForm.values.phone}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
                error={registerForm.errors.phone}
                touched={registerForm.touched.phone}
              />
              <div className="flex items-center  ">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ms-3 text-sm">
                  I accept the{" "}
                  <a
                    className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className=" w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                {status === "loading" ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Sign Up"
                )}
              </button>
              {error && <ErrorAlert title="Sign Up error!" error={error} />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
