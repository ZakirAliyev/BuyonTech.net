import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";

const OPTIONS = [
  { value: "az", short: "Az", label: "Azərbaycan" },
  { value: "en", short: "En", label: "English" },
];

export default function LanguageSelect() {
  const { language, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState(language);
  const rootRef = useRef(null);

  const current = OPTIONS.find((o) => o.value === val) || OPTIONS[0];

  useEffect(() => {
    setVal(language);
  }, [language]);

  // outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const choose = (newVal) => {
    setVal(newVal);
    changeLanguage(newVal);
    setOpen(false);
  };

  return (
    <div className="lang" ref={rootRef}>
      {/* Trigger */}
      <button
        type="button"
        className="lang__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="lang__short">{current.short}</span>
        <svg
          className={`lang__caret ${open ? "is-open" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7 10l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <ul className={`lang__menu ${open ? "is-open2" : ""}`} role="listbox">
        {OPTIONS.map((opt) => (
          <li
            key={opt.value}
            role="option"
            aria-selected={opt.value === val}
            className={`lang__item ${opt.value === val ? "is-active" : ""}`}
            onClick={() => choose(opt.value)}
            tabIndex={0}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
