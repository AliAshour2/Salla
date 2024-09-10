import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";


interface FormErrorDisplayProps {
  error?: string;
  touched?: boolean;
}

const FormErrorDisplay = ({ error, touched }: FormErrorDisplayProps) => {
  return error && touched ? (
    <Alert variant="destructive" className="bg-red-100 border-red-300 flex items-center space-x-2">
      <AlertCircle className="h-4 w-4 text-black" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  ) : null;
};

export default FormErrorDisplay;