import { useFormik } from "formik";
import { validationSchema } from "./validationSchemas";
import GoogleAuthButton from "@/components/ui/googleAuthButton";
import FormErrorDisplay from "./formErrorDisplay";


interface SignUpComponentProps {
  onSwitch: () => void;
}

const SignUpComponent = ({ onSwitch }: SignUpComponentProps) => {
  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic
      console.log("Form Submitted", values);
    },
  });

  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
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
            <div className="grid gap-y-4">
              {/* Name Form Group */}
              <div >
                <label htmlFor="name" className="block text-sm mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={registerForm.values.name}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className={`mb-2 py-3 px-4 block w-full border ${
                    registerForm.errors.name && registerForm.touched.name ? "border-red-500" : "border-gray-500"
                  } rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
                />
                <FormErrorDisplay error={registerForm.errors.name} touched={registerForm.touched.name} />
              </div>

              {/* Email Form Group */}
              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={registerForm.values.email}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className={`mb-2 py-3 px-4 block w-full border ${
                    registerForm.errors.email && registerForm.touched.email ? "border-red-500" : "border-gray-500"
                  } rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
                />
                <FormErrorDisplay error={registerForm.errors.email} touched={registerForm.touched.email} />
              </div>

              {/* Password Form Group */}
              <div>
                <label htmlFor="password" className="block text-sm mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={registerForm.values.password}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className={`mb-2 py-3 px-4 block w-full border ${
                    registerForm.errors.password && registerForm.touched.password ? "border-red-500" : "border-gray-500"
                  } rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
                />
                <FormErrorDisplay error={registerForm.errors.password} touched={registerForm.touched.password} />
              </div>

              {/* Confirm Password Form Group */}
              <div>
                <label htmlFor="rePassword" className="block text-sm mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  value={registerForm.values.rePassword}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className={`mb-2 py-3 px-4 block w-full border ${
                    registerForm.errors.rePassword && registerForm.touched.rePassword ? "border-red-500" : "border-gray-500"
                  } rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
                />
                <FormErrorDisplay error={registerForm.errors.rePassword} touched={registerForm.touched.rePassword} />
              </div>

              {/* Phone Form Group */}
              <div>
                <label htmlFor="phone" className="block text-sm mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={registerForm.values.phone}
                  onChange={registerForm.handleChange}
                  onBlur={registerForm.handleBlur}
                  className={`mb-2 py-3 px-4 block w-full border ${
                    registerForm.errors.phone && registerForm.touched.phone ? "border-red-500" : "border-gray-500"
                  } rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
                />
                <FormErrorDisplay error={registerForm.errors.phone} touched={registerForm.touched.phone} />
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="terms" className="ms-3 text-sm">
                  I accept the{" "}
                  <a href="#" className="text-blue-600 decoration-2 hover:underline focus:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;