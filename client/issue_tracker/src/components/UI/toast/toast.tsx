import { createPortal } from "react-dom";
import "./style.css"

export default function Toast(){
    return <>
    {
        createPortal(<p className="toast">
            message
        </p>,document.body)
    }
    </>
}