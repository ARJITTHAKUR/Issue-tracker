import { useEffect, useRef } from "react"
import CreateProjectForm from "./createProjectForm"

interface props{
    toggle : boolean,
    setToggle : React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddProjectForm({toggle, setToggle}:props){
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

    function formSubmit(data : object){
        console.log({data})
    } 
    return <>
          <dialog ref={modalRef}>
            <h3>Add New Project Details</h3>
            <CreateProjectForm submit={formSubmit} cancel={()=>closeModal()}/>
            {/* <button className="modal-create">Create Button</button> */}
        </dialog>
    </>
}