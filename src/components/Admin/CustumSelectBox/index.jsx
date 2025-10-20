import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";

/**
 * props:
 * - name        : string (forma göndərişi üçün)
 * - value       : string
 * - onChange    : (value: string) => void
 * - disabled    : boolean
 * - placeholder : string
 * - options     : [{ value, label }] | [{ label, options: [{value,label}] }]  // optgroup dəstəyi
 */
export default function CustomSelect({
  name = "select",
  value = "",
  onChange,
  disabled = false,
  placeholder = "Filter",
  options = [],
}) {
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(-1);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const location = useLocation()
  // options-u düz siyahıya çevirək (optgroup varsa)
  const flat = useMemo(() => {
    const out = [];
    options.forEach((opt) => {
      if (opt && Array.isArray(opt.options)) {
        out.push({ _type: "group", label: opt.label });
        opt.options.forEach((o) => out.push({ _type: "item", ...o }));
      } else {
        out.push({ _type: "item", ...opt });
      }
    });
    return out;
  }, [options]);

  const currentLabel = useMemo(() => {
    const item = flat.find((x) => x._type === "item" && String(x.value) === String(value));
    return item?.label ?? "";
  }, [flat, value]);

  // Çöldə klik → bağla
  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Klaviatura dəstəyi
  const moveFocus = (dir) => {
    if (!open) return setOpen(true);
    const idxs = flat.map((x, i) => (x._type === "item" ? i : -1)).filter((i) => i >= 0);
    if (idxs.length === 0) return;
    const curIndex = focusIdx >= 0 ? focusIdx : idxs[0];
    const curPos = idxs.indexOf(curIndex);
    const nextPos = (curPos + (dir > 0 ? 1 : -1) + idxs.length) % idxs.length;
    setFocusIdx(idxs[nextPos]);
  };

  const onKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "ArrowDown") { e.preventDefault(); moveFocus(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); moveFocus(-1); }
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      const item = flat[focusIdx];
      if (item && item._type === "item") {
        onChange?.(item.value);
        setOpen(false);
        btnRef.current?.focus();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      btnRef.current?.focus();
    }
  };

  const selectItem = (val) => {
    onChange?.(val);
    setOpen(false);
    btnRef.current?.focus();
  };

  return (
    <div style={{ width: location.pathname == '/result' ? "100%" : "", maxWidth: location.pathname == '/result' ? "260px" : "" }} className={`cs-select ${disabled ? "is-disabled" : ""} ${open ? "is-open" : ""}`} ref={wrapRef}>
      {/* Native select — display:none; forma submit üçün value buradan gedir */}
      <select name={name} value={value} onChange={(e) => onChange?.(e.target.value)} className="cs-native">
        <option value="" hidden>{ placeholder || t("adminRoot.customSelect.placeholder")}</option>
        {options.map((opt, idx) =>
          Array.isArray(opt.options) ? (
            <optgroup label={opt.label} key={`g-${idx}`}>
              {opt.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </optgroup>
          ) : (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          )
        )}
      </select>

      {/* Custom control */}
      <button
        type="button"
        id="cs-control"
        onClick={() => !disabled && setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        ref={btnRef}
        style={{ height: location.pathname == '/result' ? "45px" : "" }}
        disabled={disabled}
      >
        <span className={`cs-placeholder ${value ? "has-value" : ""}`}>
          {value ? currentLabel : placeholder}
        </span>
        <span className="cs-arrow" aria-hidden>
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
            <g clipPath="url(#clip0_558_3404)">
              <path d="M7.00046 2.16666L1.00046 2.16666C0.939713 2.16685 0.880168 2.18361 0.828234 2.21512C0.776301 2.24664 0.733946 2.29172 0.705728 2.34551C0.67751 2.39931 0.664498 2.45978 0.668092 2.52042C0.671686 2.58107 0.691751 2.63958 0.726126 2.68966L3.72613 7.023C3.85046 7.20266 4.14979 7.20266 4.27446 7.023L7.27446 2.68966C7.30918 2.63968 7.32955 2.58114 7.33334 2.5204C7.33713 2.45966 7.3242 2.39904 7.29595 2.34513C7.26771 2.29122 7.22523 2.24608 7.17314 2.21461C7.12104 2.18315 7.06132 2.16657 7.00046 2.16666Z" fill="#4D4D4D" />
            </g>
            <defs>
              <clipPath id="clip0_558_3404">
                <rect width="8" height="8" fill="white" transform="translate(8 8.5) rotate(180)" />
              </clipPath>
            </defs>
          </svg>
        </span>
      </button>

      {open && (
        <ul className="cs-dropdown" role="listbox" tabIndex={-1}>
          {flat.map((x, i) =>
            x._type === "group" ? (
              <li key={`grp-${i}`} className="cs-group">{x.label}</li>
            ) : (
              <li
                key={x.value}
                role="option"
                aria-selected={String(x.value) === String(value)}
                className={`cs-item ${String(x.value) === String(value) ? "selected" : ""} ${i === focusIdx ? "focused" : ""}`}
                onMouseEnter={() => setFocusIdx(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectItem(x.value)}
              >
                <span className="cs-item-label">{x.label}</span>
                {String(x.value) === String(value) && <span className="cs-check">✓</span>}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
