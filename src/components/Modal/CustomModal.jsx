import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const CustomModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={modalRef}
        style={{
          position: "relative",
          width: "300px",
          backgroundColor: "white",
          borderRadius: "9px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          zIndex: 1001,
        }}
      >
        {children}
        <button onClick={onClose} style={{ marginTop: "20px" }}>
          Close Modal
        </button>
      </div>
    </div>,
    document.body
  );
};

export default CustomModal;
