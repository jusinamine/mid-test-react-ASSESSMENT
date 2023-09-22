import React from "react";
import "./styles/input.css";

export default function Input({
  type = "text",
  label,
  placeholder,
  onChange,
  value,
  register = {},
  error = false,
  errorMessage = "",
}) {
  return (
    <div className="input-box">
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input ${
          error ? "input-border-error" : "input-border-normal"
        }`}
        type={type}
        placeholder={placeholder}
        {...register}
      />
      {error && <div className="hint">{errorMessage}</div>}
    </div>
  );
}
