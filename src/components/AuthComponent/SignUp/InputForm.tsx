import { Alert, AlertDescription } from "../../ui/alert";
import { AlertCircle } from "lucide-react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched: boolean | undefined;
  error: string | undefined;
}

const InputField = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  touched,
  error,
}: InputFieldProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm mb-2">
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
          className={`py-3 px-4 block w-full border-gray-500 rounded-lg text-sm border ${
            touched && error ? "border-red-500" : ""
          } focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
        />
        <div className="absolute inset-y-2.5 end-2 pointer-events-none pe-1">
          {touched && error ? (
            <div className="bg-red-400 rounded-full w-6 h-6 flex items-center justify-center">
              <i className="fa-solid fa-exclamation text-white"></i>
            </div>
          ) : null}
        </div>
      </div>
      {touched && error ? (
        <Alert
          variant="destructive"
          className="bg-red-100 border-red-300 flex items-center space-x-2"
        >
          <AlertCircle className="h-4 w-4 text-black" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
};

export default InputField;
