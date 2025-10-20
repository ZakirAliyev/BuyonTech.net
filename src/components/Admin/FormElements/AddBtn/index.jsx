import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function useLoadingDots(isLoading) {
    const [dots, setDots] = useState("");

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setDots((prev) => (prev.length < 3 ? prev + "." : ""));
            }, 500);
            return () => clearInterval(interval);
        } else {
            setDots("");
        }
    }, [isLoading]);

    return dots;
}

export default function CreateButton({ createLoading }) {
    const dots = useLoadingDots(createLoading);
    const { t } = useTranslation();

    return (
        <button
            type="submit"
            className="formAddBtn"
            disabled={createLoading}
        >
         {createLoading 
    ? `${t("adminRoot.buttons.create.saving")}${dots}` 
    : t("adminRoot.buttons.create.save")}

        </button>
    );
}
