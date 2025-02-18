import { Label } from '../ui/label';
import { Input } from '../ui/input';

type FormInputProps = {
  name?: string;
  label?: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
};

function FormInput({
  label,
  name,
  type,
  defaultValue,
  placeholder,
  readOnly = false,
  disabled = false,
  className = '',
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
        readOnly={readOnly}
        disabled={disabled}
        className={className}
      />
    </div>
  );
}

export default FormInput;
