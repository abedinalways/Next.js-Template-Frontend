import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ReusableInputProps = {
  label?: string;
  error?: string;
  containerClassName?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const ReusableInput = ({
  label,
  error,
  containerClassName,
  required,
  className,
  type = "text", // default type
  ...props
}: ReusableInputProps) => {
  return (
    <div className={`space-y-1.5 ${containerClassName || ""}`}>
      {label && (
        <Label className="text-sm text-headerColor font-medium">
          {label} {required && <span className="text-redColor">*</span>}
        </Label>
      )}

      <Input
        type={type}
        className={`h-12! md:h-13! bg-bgColor ${className || ""}`}
        {...props}
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default ReusableInput;
