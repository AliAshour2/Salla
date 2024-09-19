import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string().email("Email not valid").required("Email is required"),
  password: Yup.string().matches(
      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 6 characters long"
    ).required("Password required"),
});
