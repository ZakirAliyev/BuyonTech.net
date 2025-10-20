import { useRef } from "react";
import { useTranslation } from "react-i18next";

const SingleImageUpload = ({ formikData, name, file, setFile, existingImage, existImageUrl }) => {
  const inputRef = useRef(null);
  const { t } = useTranslation()
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      e.target.value = "";
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleClick = () => inputRef.current.click();
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      e.target.value = "";

    }
  };

  // helper function (həm File, həm string üçün)
  const getPreviewUrl = () => {
    if (file instanceof File) return URL.createObjectURL(file);
    if (typeof file === "string") {
      if (file.startsWith("http")) return file;
      return existImageUrl + file;
    }
    if (existingImage) return `${existImageUrl + existingImage}`;
    return null;
  };
  const previewUrl = getPreviewUrl();


  return (
    <div className="singleDropWrapper">
      <div
        className={`dropzone singleDrop ${previewUrl ? "active" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        {previewUrl ? (
          <div className="imageBoxAddEdit" style={{ overflow: "hidden" }}>
            <div className="imageForAddAndEdit">
              <img src={previewUrl} alt={t("adminRoot.imageUpload.previewAlt")} />
            </div>
            <span>  {file instanceof File ? file.name : t("adminRoot.imageUpload.existing")}
            </span>
          </div>
        ) : (
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
              <path d="M75 50H50M50 50H25M50 50V25M50 50V75" stroke="#A6A6A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>
        )}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      <div className="uploadInfo">
        {formikData?.touched?.[name] && formikData?.errors?.[name] ? (
          <small className="text-danger">{formikData.errors[name]}</small>
        ) : (
          <small>{t("adminRoot.imageUpload.hint")}</small>
        )}
      </div>
    </div>
  );
};

export default SingleImageUpload;
