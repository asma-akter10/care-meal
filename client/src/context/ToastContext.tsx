import { createContext, useContext, useState, type ReactNode } from "react";

const ToastContext = createContext<any>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");

  const showToast = (msg: string) => {
    setMessage(msg);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {message && (
        <div className="fixed bottom-5 right-5 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);