import type { InputTypes } from "@/types/input";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function InputLabel({
  icon,
  label,
  value,
  type,
  error,
  onChange,
  disabled,
  placeholder,
  readonly
}: InputTypes) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="flex flex-row gap-1">
          {icon}
          <Label>{label}</Label>
        </div>
      )}
      <Input
        value={value}
        type={type ?? 'text'}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder || ''}
        readOnly={readonly}

      />
      {error && (
        <span className="text-red-500 text-xs">{error}</span>
      )}
    </div>
  )
}
