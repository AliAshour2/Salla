import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";



import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleAuthButton from "../ui/googleAuthButton";

interface SignUpComponentProps {
  onSwitch: () => void;
}

const SignUpComponent = ({ onSwitch }: SignUpComponentProps) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name is to long")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()

      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 6 characters long"
      )
      .required("Password required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password and Repassword should match")
      .required("Password required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}/, "Invalid Phone Number")
      .required("Phone required"),
  });

  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {},
  });

  return (
    <>
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
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
            {/* Form */}
            <form>
              <div className="grid gap-y-4">
                {/*Name Form Group */}
                <div>
                  <label htmlFor="name" className="block text-sm mb-2">
                    Name
                  </label>
                  <div className="relative mb-2">
                    <input
                      type="name"
                      id="name"
                      name="name"
                      value={registerForm.values.name}
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                      className={`py-3 px-4 block w-full border-gray-500 rounded-lg text-sm border ${
                        registerForm.errors.name && registerForm.touched.name
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
                      required
                      aria-describedby="name-error"
                    />
                    <div className=" absolute inset-y-2.5 end-2 pointer-events-none pe-1 ">
                      {registerForm.errors.name && registerForm.touched.name ? (
                        <div className="bg-red-400 rounded-full  w-6 h-6 flex items-center justify-center">
                          <i className="fa-solid fa-exclamation text-white"></i>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Alert  */}
                  {registerForm.errors.name && registerForm.touched.name ? (
                    <Alert
                      variant="destructive"
                      className=" bg-red-100 border-red-300 flex  items-center space-x-2 "
                    >
                      <AlertCircle className="h-4 w-4 text-black" />
                      <AlertDescription>
                        {registerForm.errors.name}
                      </AlertDescription>
                    </Alert>
                  ) : null}

                  {/* Alert  */}
                </div>
                {/*Name End Form Group */}

                {/*Email Form Group */}
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email address
                  </label>
                  <div className="relative mb-2">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={registerForm.values.email}
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                      className={`py-3 px-4 block w-full border-gray-500 rounded-lg text-sm border ${
                        registerForm.errors.email && registerForm.touched.email
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
                      required
                      aria-describedby="email-error"
                    />
                    <div className=" absolute inset-y-2.5 end-2 pointer-events-none pe-1 ">
                      {registerForm.errors.email &&
                      registerForm.touched.email ? (
                        <div className="bg-red-400 rounded-full  w-6 h-6 flex items-center justify-center">
                          <i className="fa-solid fa-exclamation text-white"></i>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Alert  */}
                  {registerForm.errors.email && registerForm.touched.email ? (
                    <Alert
                      variant="destructive"
                      className=" bg-red-100 border-red-300 flex  items-center space-x-2 "
                    >
                      <AlertCircle className="h-4 w-4 text-black" />
                      <AlertDescription>
                        {registerForm.errors.email}
                      </AlertDescription>
                    </Alert>
                  ) : null}

                  {/* Alert  */}
                </div>
                {/*Email End Form Group */}

                {/*Pass Form Group */}
                <div>
                  <label htmlFor="password" className="block text-sm mb-2">
                    Password
                  </label>
                  <div className="relative mb-2">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={registerForm.handleChange}
                      value={registerForm.values.password}
                      onBlur={registerForm.handleBlur}
                      className={`py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm ${
                        registerForm.errors.password &&
                        registerForm.touched.password
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
                      required
                      aria-describedby="password-error"
                    />
                    <div className=" absolute inset-y-2.5 end-2 pointer-events-none pe-1 ">
                      {registerForm.errors.password &&
                      registerForm.touched.password ? (
                        <div className="bg-red-400 rounded-full  w-6 h-6 flex items-center justify-center">
                          <i className="fa-solid fa-exclamation text-white"></i>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {registerForm.errors.password &&
                  registerForm.touched.password ? (
                    <Alert
                      variant="destructive"
                      className=" bg-red-100 border-red-300 flex  items-center space-x-2 "
                    >
                      <AlertCircle className="h-4 w-4 text-black" />
                      <AlertDescription>
                        {registerForm.errors.password}
                      </AlertDescription>
                    </Alert>
                  ) : null}
                </div>
                {/*Pass End Form Group */}

                {/*RePass Form Group */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative mb-2">
                    <input
                      type="password"
                      id="confirm-password"
                      name="rePassword"
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                      value={registerForm.values.rePassword}
                      className={`py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm ${
                        registerForm.errors.rePassword &&
                        registerForm.touched.rePassword
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
                      required
                      aria-describedby="confirm-password-error"
                    />
                    <div className="absolute inset-y-2.5 end-2 pointer-events-none pe-1">
                      {registerForm.errors.rePassword &&
                      registerForm.touched.rePassword ? (
                        <div className="bg-red-400 rounded-full w-6 h-6 flex items-center justify-center">
                          <i className="fa-solid fa-exclamation text-white"></i>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {registerForm.errors.rePassword &&
                  registerForm.touched.rePassword ? (
                    <Alert
                      variant="destructive"
                      className="bg-red-100 border-red-300 flex items-center space-x-2"
                    >
                      <AlertCircle className="h-4 w-4 text-black" />
                      <AlertDescription>
                        {registerForm.errors.rePassword}
                      </AlertDescription>
                    </Alert>
                  ) : null}
                </div>
                {/*RePass End Form Group */}

                {/*Phone Form Group */}
                <div>
                  <label htmlFor="phone" className="block text-sm mb-2">
                    Phone
                  </label>
                  <div className="relative mb-2">
                    <input
                      type="phone"
                      id="phone"
                      name="phone"
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                      value={registerForm.values.phone}
                      className={`py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm ${
                        registerForm.errors.phone && registerForm.touched.phone
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
                      required
                      aria-describedby="phone-error"
                    />
                    <div className=" absolute inset-y-2.5 end-2 pointer-events-none pe-1 ">
                      {registerForm.errors.phone &&
                      registerForm.touched.phone ? (
                        <div className="bg-red-400 rounded-full  w-6 h-6 flex items-center justify-center">
                          <i className="fa-solid fa-exclamation text-white"></i>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {registerForm.errors.phone && registerForm.touched.phone ? (
                    <Alert
                      variant="destructive"
                      className=" bg-red-100 border-red-300 flex  items-center space-x-2 "
                    >
                      <AlertCircle className="h-4 w-4 text-black" />
                      <AlertDescription>
                        {registerForm.errors.phone}
                      </AlertDescription>
                    </Alert>
                  ) : null}
                </div>
                {/*RePass End Form Group */}

                {/* Checkbox */}
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
                      I accept the{" "}
                      <a
                        className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                {/* End Checkbox */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Sign up
                </button>
              </div>
            </form>
            {/* End Form */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpComponent;
