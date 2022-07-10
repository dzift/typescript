import React from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string,
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ error = "", value = "", className, ...props }, ref) => {
    return (
      <label className="popup__label">
        <input className="popup__input" ref={ref} {...props} />
        <span className="popup__error" id="place-name-error">
          {error || ""}
        </span>
      </label>
    );
  }
);

export default Input;
