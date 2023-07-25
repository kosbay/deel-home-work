import React from "react";

import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({ onSearch, onChange, className, ...rest }) => {
  return (
    <input
      className={`${styles.customInput} ${className}`}
      onChange={(e) => {
        onChange?.(e)
        onSearch?.(e.target.value)
      }}
      {...rest}
    />
  );
};

export default Input;