import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormInputProps = {
  name?: string;
  label?: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  
};

function FormInput({
  label,
  name,
  type,
  defaultValue,
  placeholder,
  
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
        
      />
      {type === 'password' && (
      <p className="text-xs text-gray-500">
        Password must contain at least one uppercase letter, one lowercase letter, and one number
      </p>
    )}
    </div>
  );
}

export default FormInput;