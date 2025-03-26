import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormFieldProps } from "@/types/formFieldProps";

export const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: FormFieldProps) => {
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // This ensures we pass both the name and the new value to the parent onChange function
    onChange(name, e.target.value);
  };
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      {type === "textarea" ? (
        <Textarea
          id={name}
          value={value}
          placeholder={placeholder}
          onChange={handleFieldChange}
        />
      ) : (
        <Input
          id={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleFieldChange}
        />
      )}
    </div>
  );
};
