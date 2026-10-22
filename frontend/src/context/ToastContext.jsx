import {
  createContext,
  useContext,
  useState,
} from "react";

import Toast from "../components/ui/Toast";

const ToastContext =
  createContext();

export function ToastProvider({
  children,
}) {
  const [toast, setToast] =
    useState(null);

  const showToast = (
    message,
    type = "success"
  ) => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider
      value={{ showToast }}
    >
      {children}

      {toast && (
        <div
          style={{
            position: "fixed",

            top: 20,
            right: 20,

            zIndex: 9999,
          }}
        >
          <Toast
            message={
              toast.message
            }
            type={toast.type}
          />
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(
    ToastContext
  );
}