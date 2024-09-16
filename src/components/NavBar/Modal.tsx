import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
      onClick={onClose} 
    >
      <div
        className="bg-white rounded-lg p-4 max-w-md w-full"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
