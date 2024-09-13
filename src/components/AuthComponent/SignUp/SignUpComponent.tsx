
import GoogleAuthButton from "@/components/ui/googleAuthButton";
import { useFormik } from "formik";
 // Adjust the import path as needed
import InputField from "./InputField";
import { validationSchema } from "./validationSchemas";

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
    onSubmit: () => {},
  });

  return (
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









































// import GoogleAuthButton from "@/components/ui/googleAuthButton";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import InputField from "./InputField";



// interface SignUpComponentProps {
//   onSwitch: () => void;
// }

// const SignUpComponent = ({ onSwitch }: SignUpComponentProps) => {
//   const validationSchema = Yup.object({
//     name: Yup.string()
//       .min(3, "Name must be at least 3 characters")
//       .max(30, "Name is too long")
//       .required("Name is required"),
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     password: Yup.string()
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
//         "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 6 characters long"
//       )
//       .required("Password required"),
//     rePassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Password and Repassword should match")
//       .required("Password required"),
//     phone: Yup.string()
//       .matches(/^01[0125][0-9]{8}$/, "Invalid Phone Number")
//       .required("Phone required"),
//   });

//   const registerForm = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       rePassword: "",
//       phone: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: () => {},
//   });

//   return (
//     <>
//       <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
//         <div className="p-4 sm:p-7">
//           <div className="text-center">
//             <h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
//             <p className="mt-2 text-sm text-gray-600">
//               Already have an account?
//               <button
//                 className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
//                 onClick={onSwitch}
//               >
//                 Sign in here
//               </button>
//             </p>
//           </div>
//           <div className="mt-5">
//             <GoogleAuthButton />
//             <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
//               Or
//             </div>
//             <form onSubmit={registerForm.handleSubmit}>
//               <div className="grid gap-y-4">
//                 <InputField
//                   id="name"
//                   label="Name"
//                   name="name"
//                   type="text"
//                   value={registerForm.values.name}
//                   onChange={registerForm.handleChange}
//                   onBlur={registerForm.handleBlur}
//                   error={registerForm.errors.name}
//                   touched={registerForm.touched.name}
//                 />
//                 <InputField
//                   id="email"
//                   label="Email address"
//                   name="email"
//                   type="email"
//                   value={registerForm.values.email}
//                   onChange={registerForm.handleChange}
//                   onBlur={registerForm.handleBlur}
//                   error={registerForm.errors.email}
//                   touched={registerForm.touched.email}
//                 />
//                 <InputField
//                   id="password"
//                   label="Password"
//                   name="password"
//                   type="password"
//                   value={registerForm.values.password}
//                   onChange={registerForm.handleChange}
//                   onBlur={registerForm.handleBlur}
//                   error={registerForm.errors.password}
//                   touched={registerForm.touched.password}
//                 />
//                 <InputField
//                   id="rePassword"
//                   label="Confirm Password"
//                   name="rePassword"
//                   type="password"
//                   value={registerForm.values.rePassword}
//                   onChange={registerForm.handleChange}
//                   onBlur={registerForm.handleBlur}
//                   error={registerForm.errors.rePassword}
//                   touched={registerForm.touched.rePassword}
//                 />
//                 <InputField
//                   id="phone"
//                   label="Phone"
//                   name="phone"
//                   type="tel"
//                   value={registerForm.values.phone}
//                   onChange={registerForm.handleChange}
//                   onBlur={registerForm.handleBlur}
//                   error={registerForm.errors.phone}
//                   touched={registerForm.touched.phone}
//                 />

//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
//                   />
//                   <label htmlFor="remember-me" className="ms-3 text-sm">
//                     I accept the{" "}
//                     <a
//                       className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
//                       href="#"
//                     >
//                       Terms and Conditions
//                     </a>
//                   </label>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
//                 >
//                   Sign up
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUpComponent;





















































// >>>>>>>>>>>>>>>>>>>>> BEFORE REFACTOR <<<<<<<<<<<<<<<<<<<<<<<<<
// import { useFormik } from "formik";
// import { validationSchema } from "./validationSchemas";
// import GoogleAuthButton from "@/components/ui/googleAuthButton";
// import FormErrorDisplay from "../formErrorDisplay";


// interface SignUpComponentProps {
//   onSwitch: () => void;
//   label?:string;
//   name?:string;
//   type?:string;
//   placeholder?:string;
//   error?:string;
//   touched?:boolean;
// }

// const SignUpComponent = ({ onSwitch }: SignUpComponentProps) => {
//   const registerForm = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       rePassword: "",
//       phone: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       // Handle form submission logic
//       console.log("Form Submitted", values);
//     },
//   });

//   return (
//     <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
//       <div className="p-4 sm:p-7">
//         <div className="text-center">
//           <h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
//           <p className="mt-2 text-sm text-gray-600">
//             Already have an account?{" "}
//             <button
//               className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
//               onClick={onSwitch}
//             >
//               Sign in here
//             </button>
//           </p>
//         </div>

//         <div className="mt-5">
//           <GoogleAuthButton />

//           <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
//             Or
//           </div>

//           <form onSubmit={registerForm.handleSubmit}>
//             <div className="grid gap-y-4">
//               {/* Name Form Group */}
//               <div >
//                 <label htmlFor="name" className="block text-sm mb-2">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   placeholder="Enter your name"
//                   value={registerForm.values.name}
//                   onChange={registerForm.handleChange}
//                   onBlur={registerForm.handleBlur}
//                   className={`mb-2 py-3 px-4 block w-full border ${
//                     registerForm.errors.name && registerForm.touched.name ? "border-red-500" : "border-gray-500"
//                   } rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
//                 />
//                 <FormErrorDisplay error={registerForm.errors.name} touched={registerForm.touched.name} />
//               </div>

//               {/* Email Form Group */}
//               <div>
//                 <label htmlFor="email" className="block text-sm mb-2">
//                   Email address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   placeholder="Enter your email"
//                   value={registerForm.values.email}
//                   onChange={registerForm.handleChange}
//                   onBlur={registerForm.handleBlur}
//                   className={`mb-2 py-3 px-4 block w-full border ${
//                     registerForm.errors.email && registerForm.touched.email ? "border-red-500" : "border-gray-500"
//                   } rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
//                 />
//                 <FormErrorDisplay error={registerForm.errors.email} touched={registerForm.touched.email} />
//               </div>

//               {/* Password Form Group */}
//               <div>
//                 <label htmlFor="password" className="block text-sm mb-2">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   placeholder="Enter your password"
//                   value={registerForm.values.password}
//                   onChange={registerForm.handleChange}
//                   onBlur={registerForm.handleBlur}
//                   className={`mb-2 py-3 px-4 block w-full border ${
//                     registerForm.errors.password && registerForm.touched.password ? "border-red-500" : "border-gray-500"
//                   } rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
//                 />
//                 <FormErrorDisplay error={registerForm.errors.password} touched={registerForm.touched.password} />
//               </div>

//               {/* Confirm Password Form Group */}
//               <div>
//                 <label htmlFor="rePassword" className="block text-sm mb-2">
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   id="rePassword"
//                   name="rePassword"
//                   placeholder="Confirm your password"
//                   value={registerForm.values.rePassword}
//                   onChange={registerForm.handleChange}
//                   onBlur={registerForm.handleBlur}
//                   className={`mb-2 py-3 px-4 block w-full border ${
//                     registerForm.errors.rePassword && registerForm.touched.rePassword ? "border-red-500" : "border-gray-500"
//                   } rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
//                 />
//                 <FormErrorDisplay error={registerForm.errors.rePassword} touched={registerForm.touched.rePassword} />
//               </div>

//               {/* Phone Form Group */}
//               <div>
//                 <label htmlFor="phone" className="block text-sm mb-2">
//                   Phone
//                 </label>
//                 <input
//                   type="text"
//                   id="phone"
//                   name="phone"
//                   placeholder="Enter your phone"
//                   value={registerForm.values.phone}
//                   onChange={registerForm.handleChange}
//                   onBlur={registerForm.handleBlur}
//                   className={`mb-2 py-3 px-4 block w-full border ${
//                     registerForm.errors.phone && registerForm.touched.phone ? "border-red-500" : "border-gray-500"
//                   } rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
//                 />
//                 <FormErrorDisplay error={registerForm.errors.phone} touched={registerForm.touched.phone} />
//               </div>

//               {/* Terms and Conditions Checkbox */}
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   name="terms"
//                   className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
//                 />
//                 <label htmlFor="terms" className="ms-3 text-sm">
//                   I accept the{" "}
//                   <a href="#" className="text-blue-600 decoration-2 hover:underline focus:underline">
//                     Terms and Conditions
//                   </a>
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
//               >
//                 Sign up
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpComponent;