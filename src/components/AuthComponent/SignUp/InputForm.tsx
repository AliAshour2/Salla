import { useFormik } from "formik";

import InputField from "./SignUpComponent";
import { validationSchema } from "./validationSchemas";
import GoogleAuthButton from "@/components/ui/googleAuthButton";


interface SignUpComponentProps {
  onSwitch: () => void;
  label?:string;
  name?:string;
  type?:string;
  placeholder?:string;
  error?:string;
  touched?:boolean;
}

const SignUpComponent  = ({ onSwitch }: SignUpComponentProps) => {
  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      // handel supmit insallah
    },
  });

  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?
            <button
              className="text-blue-600 decoration-2 hover:underline focus:outline-none font-medium"
              onClick={onSwitch}
            >
              Sign in here
            </button>
          </p>
        </div>

        <GoogleAuthButton />
        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
          Or
        </div>

        {/* Form */}
        <form onSubmit={registerForm.handleSubmit}>
          <div className="grid gap-y-4">
            <InputField label="Name" name="name" />
            <InputField label="Email" name="email" type="email" />
            <InputField label="Password" name="password" type="password" />
            <InputField label="Confirm Password" name="rePassword" type="password" />
            <InputField label="Phone" name="phone" />
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm ms-3">
                I accept the{" "}
                <a className="text-blue-600 decoration-2 hover:underline font-medium" href="#">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;
