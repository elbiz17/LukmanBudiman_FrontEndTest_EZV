import type { ReactNode } from "react";

export type InputTypes = {
  icon?: ReactNode;
  label?: string;
  type?:string;
  value: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  row?: number;
  options?: Item[];
};

type Item = {
  value: string;
  label: string;
};
