export interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "textarea";
  placeholder?: string;
  value: string;
  onChange: (name: string, value: string) => void;
}
