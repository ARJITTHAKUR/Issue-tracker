import { ReactComponentElement, useEffect, useRef } from "react"
import CreateProjectForm from "./createProjectForm"

interface props{
    toggle : boolean,
    setToggle : React.Dispatch<React.SetStateAction<boolean>>,
    component ?: JSX.Element,
    heading : string,
    children : JSX.Element
}
export default function DashBoardDialog({toggle, setToggle, component, heading ,children}:props){
    const modalRef = useRef<HTMLDialogElement>(null)
    const closeModal = ()=>{
        setToggle(false)
        modalRef.current?.close()
    }
    useEffect(()=>{
        if(toggle)
        modalRef.current?.showModal()
        else
        modalRef.current?.close()
    },[toggle])
    useEffect(()=>{
        modalRef.current?.addEventListener('close',()=>{
        setToggle(false)
        })   
    },[modalRef.current])

   
    return <>
          <dialog ref={modalRef}>
            <div className="modal-header">
                <span>{heading}</span>
                <span style={{cursor :'pointer'}} onClick={closeModal}>X</span>
            </div>
            {/* {component} */}
            {children}
        </dialog>
    </>
}