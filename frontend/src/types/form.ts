export type FieldType =
   | "text"
   | "email"
   | "password"
   | "number"
   | "textarea"
   | "select"
   | "checkbox"
   | "custom"
   | "multiselect";

export type SelectOption = { label: string; value: string | number };

export type FieldConfig = {
   name: string;
   type: FieldType;
   label?: string;
   placeholder?: string;
   options?: SelectOption[];
   required?: boolean;
   hint?: string;
   component?: React.FC<any>;
   props?: Record<string, any>;
   className?: React.HTMLAttributes<HTMLDivElement>["className"]; // tailwind or css class for the field container
};

export type IFieldError = { path: string; message: string };
