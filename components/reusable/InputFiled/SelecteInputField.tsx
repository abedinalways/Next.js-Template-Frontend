import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = { value: string; label: string };

interface SelecteInputFieldProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}

export default function SelecteInputField({
  value,
  onValueChange,
  options,
  placeholder = "Select",
  className = "",
  id,
  disabled = false,
}: SelecteInputFieldProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        id={id}
        className={`${className} h-12! md:h-13! bg-bgColor w-full`}
        disabled={disabled}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
