import React from 'react'
import { useLocation } from 'react-router'

const Popup = ({ isActive, onClose, children }) => {
  const location = useLocation()
  return (
    <div
      id="popup"
      className={isActive ? 'activePopup' : ''}
      onClick={onClose} // overlay click
    >
      <div
        className="popupInside"
        style={{
          width:
            location.pathname == '/admin/projects' ? "1000px" : ""
        }}
        onClick={(e) => e.stopPropagation()} // içində kliklənəndə bağlanmasın
      >
        <div className="closeBtnPopup" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none">
            <path d="M12.0008 13.4L7.10078 18.3C6.91745 18.4833 6.68411 18.575 
            6.40078 18.575C6.11745 18.575 5.88411 18.4833 5.70078 18.3C5.51745 
            18.1167 5.42578 17.8833 5.42578 17.6C5.42578 17.3167 5.51745 
            17.0833 5.70078 16.9L10.6008 12L5.70078 7.1C5.51745 6.91667 
            5.42578 6.68334 5.42578 6.4C5.42578 6.11667 5.51745 5.88334 
            5.70078 5.7C5.88411 5.51667 6.11745 5.425 6.40078 5.425C6.68411 
            5.425 6.91745 5.51667 7.10078 5.7L12.0008 10.6L16.9008 5.7C17.0841 
            5.51667 17.3174 5.425 17.6008 5.425C17.8841 5.425 18.1174 5.51667 
            18.3008 5.7C18.4841 5.88334 18.5758 6.11667 18.5758 6.4C18.5758 
            6.68334 18.4841 6.91667 18.3008 7.1L13.4008 12L18.3008 
            16.9C18.4841 17.0833 18.5758 17.3167 18.5758 17.6C18.5758 
            17.8833 18.4841 18.1167 18.3008 18.3C18.1174 18.4833 17.8841 
            18.575 17.6008 18.575C17.3174 18.575 17.0841 18.4833 
            16.9008 18.3L12.0008 13.4Z" fill="black" />
          </svg>
        </div>
        <div className="popupFormBox">{children}</div>
      </div>
    </div>
  )
}

export default Popup
