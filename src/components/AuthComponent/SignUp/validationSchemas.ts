import * as Yup from "yup";

export const validationSchema = Yup.object({
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
    .required("Password required"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password and Repassword should match")
    .required("Password required"),
  phone: Yup.string()
    .matches(/^01[0125][0-9]{8}/, "Invalid Phone Number")
    .required("Phone required"),
});
