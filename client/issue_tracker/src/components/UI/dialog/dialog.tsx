import { useRef } from "react"

interface props{
    toggle : boolean
}
export default function DialogForm({toggle}:props){
    const modalRef = useRef<HTMLDialogElement>(null)

    return <>
          <dialog ref={modalRef}>
            hi there
            <button onClick={()=>modalRef.current?.close()}>cancel</button>
        </dialog>
    </>
}