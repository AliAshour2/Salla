import { AppDispatch } from "@/app/store";
import { clearError } from "@/features/auth/slices/authSlice";
import React from "react";
import { useDispatch } from "react-redux";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const dispatch = useDispatch<AppDispatch>();
  if (!isOpen) return null;

  const handleClose = () => {
    // You can dispatch a clear error action here if needed
    dispatch(clearError());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 p-4  flex items-center justify-center overflow-auto bg-black bg-opacity-50"
      onClick={handleClose} 
    >
      <div
        className="bg-white rounded-lg p-4 max-w-md w-full"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
