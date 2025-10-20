import React from 'react'
import { useTranslation } from 'react-i18next'

const DeletePopup = ({ isActive, onClose, onDelete, deleteId, title }) => {
    const { t, i18n } = useTranslation()

  // title-ı dilə uyğun göstərmək üçün
  const localizedTitle = 
    i18n.language.startsWith('en') ? (title?.en || title?.az) : (title?.az || title?.en)

  return (
    <div
      id="deletePopup"
      className={isActive ? 'activePopupDeletePopup' : ''}
      onClick={onClose}
    >
      <div
        className="deletePopupInside"
        onClick={(e) => e.stopPropagation()} // içində kliklənəndə bağlanmasın
      >

        <div className="deletePopupFormBox">

          <div className="deletePopupTop">
            <div className="rejectIconBx1">
              <div className="rejectIconBx2">
                <div className="rejectIconBx3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="27" viewBox="0 0 26 27" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M21.2971 6.78663L19.7743 5.26384L13.0289 12.02L6.28353 5.26384L4.76074 6.78663L11.5169 13.532L4.76074 20.2774L6.28353 21.8002L13.0289 15.0441L19.7743 21.8002L21.2971 20.2774L14.541 13.532L21.2971 6.78663Z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="deletePopupMiddle">
            <h2>              {t('adminRoot.deletePopup.confirmMessage', { title: localizedTitle })}
            </h2>
          </div>
          <div className="deletePopupBottom">
            <button className="deleteLeftBtn" onClick={onClose}>
              {t('adminRoot.deletePopup.cancel')}
            </button>
            <button className="deleteRightBtn" onClick={onDelete}
            >
              {t('adminRoot.deletePopup.delete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeletePopup
