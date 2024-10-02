import { AppDispatch, RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { verifyResetCode } from "@/features/auth/thunks/authThunks";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { validationSchema } from "./validationSchema";
import { useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Terminal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { clearError } from "@/features/auth/slices/authSlice";
import ErrorAlert from "@/components/shared/ErrorAlert";

const OtpComponent = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { status, error, message } = useSelector(
    (state: RootState) => state.auth
  );

  const [isOpen, setIsOpen] = useState(false);

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("OTP value:", values.otp);
      dispatch(verifyResetCode(values.otp));
    },
  });

  const handleOtpChange = (value: string) => {
    formik.setFieldValue("otp", value);
  };

  const handleComplete = () => {
    formik.submitForm();
  };


  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      dispatch(clearError()); // Clear error when dialog opens
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline">Forgot Password</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogDescription>
              Enter the 4-digit code sent to your email to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form className="mx-auto" onSubmit={formik.handleSubmit} ref={formRef} action="">
            <InputOTP
              value={formik.values.otp}
              onChange={handleOtpChange}
              onComplete={handleComplete}
              maxLength={6}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </form>

          <Button
            className="w-full bg-blue-500 "
            onClick={handleComplete}
            type="submit"
          >
            {status === "loading" ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              "Vertify code"
            )}
          </Button>

          {error && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error Verfication Code</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          

          {status == "succeeded" && message && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OtpComponent;
