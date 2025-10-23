import React from "react";

const SelectElement = React.forwardRef(
  (
    {
      name,
      label,
      placeholder = "Select option",
      value,
      onChange,
      onBlur,
      error,
      touched,
      imgSrc,
      alt,
      className,
      required = false,
      disabled = false,
      options = [], // [{ value: '1', label: 'Option 1' }]
    },
    ref
  ) => {
    return (
      <>
        <div className={`selectElement ${className || ""}`}>
          {label && (
            <label htmlFor={name}>
              {label}
              {required && "*"}
            </label>
          )}

          <div className="selectWrapper">
            <select
              id={name}
              name={name}
              value={value ?? ""}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              required={required}
              disabled={disabled}
              className={error && touched ? "select-error" : ""}
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((opt, index) => (
                <option key={index} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {imgSrc && (
              <div className="imageBoxSelect">
                <img src={imgSrc} alt={alt || ""} />
              </div>
            )}
          </div>
        </div>

        {error && touched && <p className="error-text">{error}</p>}
      </>
    );
  }
);

export default SelectElement;
