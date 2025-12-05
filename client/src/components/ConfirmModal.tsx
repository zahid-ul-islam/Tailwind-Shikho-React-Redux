import React from "react";
import ReactDOM from "react-dom";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning",
}) => {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      icon: "🗑️",
      confirmBtn: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
      iconBg: "bg-red-500/20 text-red-400",
    },
    warning: {
      icon: "⚠️",
      confirmBtn: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
      iconBg: "bg-yellow-500/20 text-yellow-400",
    },
    info: {
      icon: "ℹ️",
      confirmBtn: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
      iconBg: "bg-indigo-500/20 text-indigo-400",
    },
  };

  const style = typeStyles[type];

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-gray-900/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6 animate-in zoom-in-95 duration-200">
        {/* Icon */}
        <div className="flex items-center justify-center mb-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${style.iconBg}`}
          >
            {style.icon}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-white text-center mb-2">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-300 text-center mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 py-3 px-4 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${style.confirmBtn}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
