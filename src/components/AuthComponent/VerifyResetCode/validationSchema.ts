import * as Yup from 'yup';
export const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .length(6, "OTP must be exactly 6 digits")
      .required("OTP is required"),
  });