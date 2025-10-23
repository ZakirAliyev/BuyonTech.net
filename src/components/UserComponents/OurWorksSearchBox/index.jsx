import { useId } from "react";
import { IoSearchOutline } from "react-icons/io5";
import "./index.scss";

export default function SearchBox({ value, onChange, placeholder = "Search Product" }) {
  const id = useId();
  return (
    <label className="searchBoxUser" htmlFor={id}>
      <IoSearchOutline className="leftIcon" aria-hidden />
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {/* <SlidersHorizontal className="rightIcon" aria-hidden /> */}
    </label>
  );
}
