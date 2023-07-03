import { createContext } from "react";
interface toast {
    showToast ?: ()=>void 
}
export const ToastContext = createContext<toast>({});


