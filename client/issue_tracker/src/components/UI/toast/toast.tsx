import { createPortal } from "react-dom";
import "./style.css"

// interface props {
//     text : string
// }
export default function Toast(){
    return <>
    {
        createPortal(<p className="toast">
            message
        </p>,document.body)
    }
    </>
}