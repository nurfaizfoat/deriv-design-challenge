export interface TextFieldProps {
  label: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
