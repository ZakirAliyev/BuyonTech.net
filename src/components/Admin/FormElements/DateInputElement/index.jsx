import React from "react";

const DateInputElement = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder = "Select date",
  error,
  touched,
  required = false,
  disabled = false,
}) => {
  const handleClick = () => {
    const realInput = document.getElementById(name);
    if (realInput?.showPicker) realInput.showPicker();
    else realInput?.focus();
  };

  // 🔹 ISO → dd.MM.yyyy çevirmə funksiyası
  const handleDateChange = (e) => {
    const isoValue = e.target.value; // məsələn: 2025-10-14
    if (!isoValue) {
      onChange(e);
      return;
    }

    const [year, month, day] = isoValue.split("-");
    const formatted = `${day}.${month}.${year}`; // dd.MM.yyyy formatına çevir

    onChange({
      target: {
        name,
        value: formatted,
      },
    });
  };

  // 🔹 Əgər dəyər dd.MM.yyyy formatındadırsa → ISO formatına çevir ki, təqvim onu tanısın
  const formattedValue =
    value && /^\d{2}\.\d{2}\.\d{4}$/.test(value)
      ? `${value.split(".")[2]}-${value.split(".")[1]}-${value.split(".")[0]}`
      : value || "";

  return (
    <div className={`dateInputElement ${disabled ? "disabled" : ""}`}>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div className="dateWrapper" onClick={!disabled ? handleClick : undefined}>
        {/* Real input */}
        <input
          id={name}
          name={name}
          type="date"
          value={formattedValue}
          onChange={handleDateChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          autoComplete="off"
        />

        {/* Custom görünən hissə */}
        <div className={`customDisplay ${value ? "active" : ""}`}>
          <span>{value || placeholder}</span>
          <div className="calendarIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 
              6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 
              21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>

      {error && touched && <p className="error-text">{error}</p>}
    </div>
  );
};

export default DateInputElement;
