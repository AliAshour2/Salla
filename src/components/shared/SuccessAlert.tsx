import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface SuccessAlertProps {
  message: string;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({ message }) => (
  <Alert>
    <Terminal className="h-4 w-4" />
    <AlertTitle>Success!</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export default SuccessAlert;
