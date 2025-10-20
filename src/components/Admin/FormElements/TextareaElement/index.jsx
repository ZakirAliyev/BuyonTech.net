import React from 'react'

const TextareaElement = React.forwardRef(({
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
        <div className={`textareaElement ${className || ""}`}>
            {label && <label htmlFor={name}>{label}{required && "*"}</label>}

            <textarea
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
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

            ></textarea>

            {imgSrc && (
                <div className="imageBoxInput">
                    <img src={imgSrc} alt={alt || ""} />
                </div>
            )}

            {error && touched && <p className="error-text">{error}</p>}
        </div>
    )
})

export default TextareaElement
