import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface InputFieldProps {
  id: string;
  label: string;
  name: string;
  placeholder:  string ;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

const InputField = ({
  id,
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required,
}: InputFieldProps) => {
  return (
    <div>
      <label htmlFor="id" className="block text-sm mb-2">
        {label}
      </label>
      <div className="relative mb-2">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          aria-describedby={`${id}-error`}
          className={`py-3 px-4 block w-full border-gray-500 rounded-lg text-sm border ${
            error && touched ? "border-red-500" : ""
          } focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
        />
        {error && touched && (
          <div className="absolute inset-y-2.5 end-2 pointer-events-none pe-1">
            <div className="flex items-center justify-center bg-red-400 rounded-full w-6 h-6">
              <i className="fa-solid fa-exclamation text-white"></i>
            </div>
          </div>
        )}
      </div>
      {error && touched && (
        <Alert
          variant="destructive"
          className=" bg-red-100 border-red-300 flex items-center space-x-2"
        >
          <AlertCircle className="h-4 w-4 text-black" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default InputField;
