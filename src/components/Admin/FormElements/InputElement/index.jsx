import React from 'react'

const InputElement = React.forwardRef(({
    name,
    label,
    type = "text",
    placeholder = "Enter text",
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
    autoComplete = "off",
    min,
    max,
    minLength,
    maxLength,
}, ref) => {
    return (
        <>
            <div className={`inputElement ${className || ""}`}>
                {label && <label htmlFor={name}>{label}{required && "*"}</label>}

                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value ?? ""}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    required={required}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    min={min}
                    max={max}
                    minLength={minLength}
                    maxLength={maxLength}
                    className={error && touched ? "input-error" : ""}
                />

                {imgSrc && (
                    <div className="imageBoxInput">
                        <img src={imgSrc} alt={alt || ""} />
                    </div>
                )}

            </div>
            {error && touched && <p className="error-text">{error}</p>}
        </>
    )
})

export default InputElement
