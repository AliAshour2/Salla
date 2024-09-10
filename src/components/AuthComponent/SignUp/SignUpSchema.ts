import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name is too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 6 characters long"
    )
    .required("Password is required"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  phone: Yup.string()
    .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
    .required("Phone is required"),
});
