import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

interface ErrorAlertProps {
  error: string;
  title: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ title, error }) => (
  <Alert variant="destructive">
    <ShieldAlert className="h-4 w-4" />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{error}</AlertDescription>
  </Alert>
);

export default ErrorAlert;
