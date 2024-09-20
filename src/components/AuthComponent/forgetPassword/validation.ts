import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string().email("Email not valid").required("Email is required"),
});
