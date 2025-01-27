import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormInputProps = {
  name?: string;
  label?: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  helper?: string;
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
    </div>
  );
}

export default FormInput;