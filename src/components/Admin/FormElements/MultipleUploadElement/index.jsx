// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { Modal } from "antd";
// import { FaTrash } from "react-icons/fa";
// import { useTranslation } from "react-i18next";

// const MultiFileUpload = ({
//   type,
//   files,
//   setFiles,
//   existingFiles = [],
//   setExistingFiles,
//   filePath,
//   formik,
//   name,
//   countImg
// }) => {
//   const { t } = useTranslation();
//   const inputRef = useRef(null);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewSrc, setPreviewSrc] = useState(null);

//   const isValidType = (file) => {
//     if (type === "image") {
//       if (file.type?.startsWith?.("image/")) return true;
//       const ext = file.name?.split('.').pop()?.toLowerCase();
//       return ['jpg', 'jpeg', 'png', 'webp'].includes(ext);
//     } else {
//       if (file.type?.startsWith?.("video/")) return true;
//       const ext = file.name?.split('.').pop()?.toLowerCase();
//       return ['mp4', 'mov', 'webm', 'mkv', 'avi'].includes(ext);
//     }
//   };
//   const getFileSrc = (item) =>
//     item instanceof File ? URL.createObjectURL(item) : item;

//   useEffect(() => {
//     return () => {
//       if (previewSrc?.startsWith?.("blob:")) URL.revokeObjectURL(previewSrc);
//     };
//   }, [previewSrc]);

//   const handleClick = () => inputRef.current?.click();
//   const handleDragOver = (e) => e.preventDefault();

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const dropped = Array.from(e.dataTransfer.files || []).filter(isValidType);
//     if (!dropped.length) return;
//     const updated = [...files, ...dropped];
//     setFiles(updated);
//     formik.setFieldValue(name, updated);
//     formik.setTouched({ ...formik.touched, [name]: true });

//     formik.validateField(name);
//   };

//   const handleFileChange = (e) => {
//     const picked = Array.from(e.target.files || []).filter(isValidType);
//     if (!picked.length) return;
//     const updated = [...files, ...picked];
//     setFiles(updated);
//     formik.setFieldValue(name, updated);
//     formik.setTouched({ ...formik.touched, [name]: true });

//     formik.validateField(name);
//     e.target.value = "";
//   };

//   const openPreview = (item) => {
//     const src =
//       item.kind === "existing"
//         ? (filePath + item.value)
//         : getFileSrc(item.value);

//     setPreviewSrc(src);
//     setPreviewOpen(true);
//   };

//   const closePreview = () => {
//     if (previewSrc?.startsWith?.("blob:")) URL.revokeObjectURL(previewSrc);
//     setPreviewSrc(null);
//     setPreviewOpen(false);
//   };

//   const removeExistingByIndex = (idx) => {
//     if (!setExistingFiles) return;
//     const updated = existingFiles.filter((_, i) => i !== idx);
//     setExistingFiles(updated);
//     // formik.setFieldValue(name, [...updated, ...files]);
//     formik.setFieldValue(name, files);
//     formik.setTouched({ ...formik.touched, [name]: true });
//     formik.validateField(name);
//   };

//   const removeNewByIndex = (idx) => {
//     const updated = files.filter((_, i) => i !== idx);
//     setFiles(updated);
//     formik.setFieldValue(name, updated);

//     formik.validateField(name);
//   };

//   const renderItems = useMemo(() => {
//     const existing = (existingFiles || []).map((url, eIndex) => ({
//       kind: "existing",
//       value: url,
//       eIndex,
//     }));
//     const news = (files || []).map((f, nIndex) => ({
//       kind: "new",
//       value: f,
//       nIndex,
//     }));
//     return [...existing, ...news];
//   }, [existingFiles, files]);

//   const totalCount = (files?.length || 0) + (existingFiles?.length || 0);
//   const minText =
//     name != "projectSliderImages"
//       ? t("adminRoot.imageError.project_min_4")
//       : t("adminRoot.imageError.slider_min_3");

//   return (
//     <div className="multipleDropWrapper">
//       <div className={`multiUpload ${type}`}>
//         <div
//           className={`dropzone ${totalCount ? "active" : ""}`}
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           onClick={handleClick}
//         >
//           <p>
//             <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
//               <path d="M75 50H50M50 50H25M50 50V25M50 50V75" stroke="#A6A6A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </p>
//           <input
//             ref={inputRef}
//             type="file"
//             accept={"image/* , video/*"}
//             // accept={type === "image" ? "image/*" : "video/*"}
//             multiple
//             onChange={handleFileChange}
//             style={{ display: "none" }}
//           />
//         </div>

//         {totalCount > 0 && (
//           <div className="previewList previewListProjects">
//             {renderItems.map((item, i) => {
//               const src =
//                 item.kind === "existing" ? item.value : getFileSrc(item.value);
//               const alt =
//                 item.kind === "existing"
//                   ? `${type}-existing-${item.eIndex}`
//                   : item.value?.name || `${type}-new-${item.nIndex}`;

//               return (
//                 <div className="previewItem" key={`${item.kind}-${i}`}>
//                   <div className="previewInsideBox">
//                     {/* {type === "image" ? (
//                       <img
//                         src={item.kind === "existing" ? filePath + src : src}
//                         alt={alt}
//                         onClick={() => openPreview(item)}
//                         style={{ cursor: "pointer" }}
//                       />
//                     ) : (
//                       <video
//                         src={src}
//                         width={200}
//                         style={{ cursor: "pointer" }}
//                         onClick={() => openPreview(item.value)}
//                       />
//                     )} */}
//                     {type === "image" ? (
//                       <img
//                         src={item.kind === "existing" ? filePath + src : src}
//                         alt={alt}
//                         onClick={() => openPreview(item)}
//                         style={{ cursor: "pointer" }}
//                       />
//                     ) : (
//                       <video
//                         src={src}
//                         width={200}
//                         style={{ cursor: "pointer" }}
//                         onClick={() => openPreview(item.value)}
//                       />
//                     )}
//                     <button
//                       type="button"
//                       onClick={() =>
//                         item.kind === "existing"
//                           ? removeExistingByIndex(item.eIndex)
//                           : removeNewByIndex(item.nIndex)
//                       }
//                       className="trashBtn"
//                       style={{ color: "red" }}
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                   <div className="badge" style={{ fontSize: 12, opacity: 0.8 }}>
//                     {item.kind === "existing"
//                       ? t("adminRoot.multiFileUpload.badges.old")
//                       : t("adminRoot.multiFileUpload.badges.new")}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* ✅ Error və ya Məlumat Yazısı */}
//         {formik.touched[name] && formik.errors[name] ? (
//           <div className="testimonialError">{formik.errors[name]}</div>
//         ) : (

//           <small
//             style={{
//               color: "grey", paddingTop: "5px", fontSize: "14px"
//             }}
//           >
//             {minText} <br />
//             {t("adminRoot.imageError.image_type")}
//           </small>
//         )}

//         <Modal
//           open={previewOpen}
//           footer={null}
//           onCancel={closePreview}
//           width={600}
//           zIndex={99999999999999}
//           closable={false}
//         >
//           {type === "image" ? (
//             <img
//               src={previewSrc || ""}
//               alt={t("adminRoot.multiFileUpload.previewAlt")}
//               style={{ width: "100%" }}
//             />
//           ) : (
//             <video
//               src={previewSrc || ""}
//               style={{ width: "100%" }}
//               controls
//               aria-label={t("adminRoot.multiFileUpload.previewAlt")}
//             />
//           )}
//         </Modal>
//       </div>
//     </div>

//   );
// };

// export default MultiFileUpload;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "antd";
import { FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const MultiFileUpload = ({
  files,
  setFiles,
  existingFiles = [],
  setExistingFiles,
  filePath,
  formik,
  name
}) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [previewType, setPreviewType] = useState(null);

  const getFileSrc = (item) =>
    item instanceof File ? URL.createObjectURL(item) : item;

  useEffect(() => {
    return () => {
      if (previewSrc?.startsWith?.("blob:")) URL.revokeObjectURL(previewSrc);
    };
  }, [previewSrc]);

  const handleClick = () => inputRef.current?.click();
  const handleDragOver = (e) => e.preventDefault();

  // ✅ Fayl tipini yoxlayan funksiya
  const isValidType = (file) => {
    const ext = file.name?.split(".").pop()?.toLowerCase();
    if (file.type.startsWith("image/") || ["jpg", "jpeg", "png", "webp"].includes(ext)) return "image";
    if (file.type.startsWith("video/") || ["mp4", "mov", "webm", "mkv", "avi"].includes(ext)) return "video";
    return null;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files || []).filter((f) => isValidType(f));
    if (!dropped.length) return;
    const updated = [...files, ...dropped];
    setFiles(updated);
    formik.setFieldValue(name, updated);
    formik.setTouched({ ...formik.touched, [name]: true });
    formik.validateField(name);
  };

  const handleFileChange = (e) => {
    const picked = Array.from(e.target.files || []).filter((f) => isValidType(f));
    if (!picked.length) return;
    const updated = [...files, ...picked];
    setFiles(updated);
    formik.setFieldValue(name, updated);
    formik.setTouched({ ...formik.touched, [name]: true });
    formik.validateField(name);
    e.target.value = "";
  };

  const openPreview = (item) => {
    const src =
      item.kind === "existing"
        ? filePath + item.value
        : getFileSrc(item.value);

    const type = item.kind === "existing"
      ? (item.value.match(/\.(mp4|mov|webm|mkv|avi)$/i) ? "video" : "image")
      : (item.value.type.startsWith("video/") ? "video" : "image");

    setPreviewType(type);
    setPreviewSrc(src);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    if (previewSrc?.startsWith?.("blob:")) URL.revokeObjectURL(previewSrc);
    setPreviewSrc(null);
    setPreviewType(null);
    setPreviewOpen(false);
  };

  const removeExistingByIndex = (idx) => {
    if (!setExistingFiles) return;
    const updated = existingFiles.filter((_, i) => i !== idx);
    setExistingFiles(updated);
    formik.setFieldValue(name, files);
    formik.setTouched({ ...formik.touched, [name]: true });
    formik.validateField(name);
  };

  const removeNewByIndex = (idx) => {
    const updated = files.filter((_, i) => i !== idx);
    setFiles(updated);
    formik.setFieldValue(name, updated);
    formik.validateField(name);
  };

  const renderItems = useMemo(() => {
    const existing = (existingFiles || []).map((url, eIndex) => ({
      kind: "existing",
      value: url,
      eIndex,
    }));
    const news = (files || []).map((f, nIndex) => ({
      kind: "new",
      value: f,
      nIndex,
    }));
    return [...existing, ...news];
  }, [existingFiles, files]);

  const totalCount = (files?.length || 0) + (existingFiles?.length || 0);

  return (
    <div className="multipleDropWrapper">
      <div className="multiUpload mixed">
        <div
          className={`dropzone ${totalCount ? "active" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleClick}
        >
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
              <path d="M75 50H50M50 50H25M50 50V25M50 50V75" stroke="#A6A6A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {totalCount > 0 && (
          <div className="previewList previewListProjects">
            {renderItems.map((item, i) => {
              const src =
                item.kind === "existing" ? item.value : getFileSrc(item.value);

              const isVideo =
                item.kind === "existing"
                  ? /\.(mp4|mov|webm|mkv|avi)$/i.test(item.value)
                  : item.value.type.startsWith("video/");

              return (
                <div className="previewItem" key={`${item.kind}-${i}`}>
                  <div className="previewInsideBox">
                    {isVideo ? (
                      <video
                        src={item.kind === "existing" ? filePath + src : src}
                        width={200}
                        onClick={() => openPreview(item)}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <img
                        src={item.kind === "existing" ? filePath + src : src}
                        alt="preview"
                        onClick={() => openPreview(item)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        item.kind === "existing"
                          ? removeExistingByIndex(item.eIndex)
                          : removeNewByIndex(item.nIndex)
                      }
                      className="trashBtn"
                      style={{ color: "red" }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <div className="badge" style={{ fontSize: 12, opacity: 0.8 }}>
                    {item.kind === "existing"
                      ? t("adminRoot.multiFileUpload.badges.old")
                      : t("adminRoot.multiFileUpload.badges.new")}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {formik.touched[name] && formik.errors[name] ? (
          <div className="testimonialError">{formik.errors[name]}</div>
        ) : (

          <small
            style={{
             
              color: "grey", paddingTop: "5px", fontSize: "14px"
            }}
          >
            {t("adminRoot.imageError.image_type")}
          </small>
        )}

        <Modal
          open={previewOpen}
          footer={null}
          onCancel={closePreview}
          width={600}
          zIndex={9999999}
          closable={false}
        >
          {previewType === "video" ? (
            <video
              src={previewSrc || ""}
              style={{ width: "100%" }}
              controls
            />
          ) : (
            <img
              src={previewSrc || ""}
              alt="preview"
              style={{ width: "100%" }}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MultiFileUpload;
