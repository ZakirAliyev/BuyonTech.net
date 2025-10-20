import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function EditButton({ editLoading }) {
  const [dots, setDots] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (editLoading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setDots("");
    }
  }, [editLoading]);

  return (
    <button
      type="submit"
      className="editBtn"
      disabled={editLoading}
    >
  {editLoading
    ? `${t("adminRoot.buttons.edit.saving")}${dots}`
    : t("adminRoot.buttons.edit.update")}
    </button>
  );
}

export default EditButton;
