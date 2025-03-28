export interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "textarea" | "number";
  placeholder?: string;
  value: string | number | undefined;
  onChange: (name: string, value: string) => void;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
