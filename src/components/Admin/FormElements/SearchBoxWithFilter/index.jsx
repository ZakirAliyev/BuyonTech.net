import { useId, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoCalendarOutline } from "react-icons/io5";

export default function SearchBoxWithFilter({
    value,
    onChange,
    onFilterSearch,
    placeholder = "Search Product",
    minMaxRange = { min: "", max: "" },
}) {
    const {t}=useTranslation()
    const id = useId();
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const boxRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (boxRef.current && !boxRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formatToDisplay = (iso) => {
        if (!iso) return "";
        const [y, m, d] = iso.split("-");
        return `${d}.${m}.${y}`;
    };

    const handleSearch = () => {
        onFilterSearch({
            start: formatToDisplay(startDate),
            end: formatToDisplay(endDate),
        });
        setIsOpen(false);
    };

    return (
        <div className="searchBoxWrapper" ref={boxRef}>
            <label className="searchBoxUser" htmlFor={id}>
                <div aria-hidden className="leftIcon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M16.893 16.92L19.973 20M19 11.5C19 13.4891 18.2098 15.3968 16.8033 16.8033C15.3968 18.2098 13.4891 19 11.5 19C9.51088 19 7.60322 18.2098 6.1967 16.8033C4.79018 15.3968 4 13.4891 4 11.5C4 9.51088 4.79018 7.60322 6.1967 6.1967C7.60322 4.79018 9.51088 4 11.5 4C13.4891 4 15.3968 4.79018 16.8033 6.1967C18.2098 7.60322 19 9.51088 19 11.5Z"
                            stroke="#CCCCCC"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <input
                    id={id}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />

                <div
                    className={`rightIcon ${isOpen ? "active" : ""}`}
                    aria-hidden
                    onClick={() => setIsOpen((p) => !p)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M21.25 12H8.895M4.534 12H2.75M4.534 12C4.534 11.4218 4.76368 10.8673 5.17251 10.4585C5.58134 10.0497 6.13583 9.82 6.714 9.82C7.29217 9.82 7.84666 10.0497 8.25549 10.4585C8.66432 10.8673 8.894 11.4218 8.894 12C8.894 12.5782 8.66432 13.1327 8.25549 13.5415C7.84666 13.9503 7.29217 14.18 6.714 14.18C6.13583 14.18 5.58134 13.9503 5.17251 13.5415C4.76368 13.1327 4.534 12.5782 4.534 12ZM21.25 18.607H15.502M15.502 18.607C15.502 19.1853 15.2718 19.7404 14.8628 20.1493C14.4539 20.5583 13.8993 20.788 13.321 20.788C12.7428 20.788 12.1883 20.5573 11.7795 20.1485C11.3707 19.7397 11.141 19.1852 11.141 18.607M15.502 18.607C15.502 18.0287 15.2718 17.4746 14.8628 17.0656C14.4539 16.6567 13.8993 16.427 13.321 16.427C12.7428 16.427 12.1883 16.6567 11.7795 17.0655C11.3707 17.4743 11.141 18.0288 11.141 18.607M11.141 18.607H2.75M21.25 5.393H18.145M13.784 5.393H2.75M13.784 5.393C13.784 4.81483 14.0137 4.26033 14.4225 3.8515C14.8313 3.44268 15.3858 3.213 15.964 3.213C16.2503 3.213 16.5338 3.26938 16.7983 3.37894C17.0627 3.4885 17.3031 3.64907 17.5055 3.8515C17.7079 4.05394 17.8685 4.29426 17.9781 4.55875C18.0876 4.82324 18.144 5.10672 18.144 5.393C18.144 5.67928 18.0876 5.96276 17.9781 6.22725C17.8685 6.49174 17.7079 6.73206 17.5055 6.93449C17.3031 7.13692 17.0627 7.2975 16.7983 7.40705C16.5338 7.51661 16.2503 7.573 15.964 7.573C15.3858 7.573 14.8313 7.34332 14.4225 6.93449C14.0137 6.52566 13.784 5.97117 13.784 5.393Z"
                            stroke="#B3B3B3"
                            strokeOpacity="0.8"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            </label>

            {isOpen && (
                <div className="filterDropdown">
                    <p className="filterTitle">
                        {
                            t('siteRoot.common.rangeBox')
                        }
                    </p>
                    <div className="inputs">
                        {/* ======= Start Date ======= */}
                        <div className="dateBox">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                id="startDateInput"
                                min={minMaxRange.min}
                                max={endDate || minMaxRange.max}
                            />
                            <div
                                className="fakeDate"
                                onClick={() =>
                                    document.getElementById("startDateInput")?.showPicker()
                                }
                            >
                                <span>
                                    {startDate
                                        ? startDate.split("-").reverse().join(".")
                                        : "dd.mm.yyyy"}
                                </span>
                                <IoCalendarOutline className="icon" />
                            </div>
                        </div>

                        {/* ======= End Date ======= */}
                        <div className="dateBox">
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                id="endDateInput"
                                min={startDate || minMaxRange.min} // ✅ endDate min = startDate və ya ümumi min
                                max={minMaxRange.max}
                            />
                            <div
                                className="fakeDate"
                                onClick={() =>
                                    document.getElementById("endDateInput")?.showPicker()
                                }
                            >
                                <span>
                                    {endDate ? endDate.split("-").reverse().join(".") : "dd.mm.yyyy"}
                                </span>
                                <IoCalendarOutline className="icon" />
                            </div>
                        </div>

                        <button className="searchBtn" onClick={handleSearch}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M16.893 16.92L19.973 20M19 11.5C19 13.4891 18.2098 15.3968 16.8033 16.8033C15.3968 18.2098 13.4891 19 11.5 19C9.51088 19 7.60322 18.2098 6.1967 16.8033C4.79018 15.3968 4 13.4891 4 11.5C4 9.51088 4.79018 7.60322 6.1967 6.1967C7.60322 4.79018 9.51088 4 11.5 4C13.4891 4 15.3968 4.79018 16.8033 6.1967C18.2098 7.60322 19 9.51088 19 11.5Z"
                                    stroke="#CCCCCC"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
