import { useRef } from "react";
import "./style.css"
export default function DashBoardPage(){

    const modalRef = useRef<HTMLDialogElement>(null)
    const addProject = ()=>{
        modalRef?.current?.showModal()
    }
    return (
      <>
        <header>
          <span>Dashboard</span>
          {/* <span>logout</span> */}
        </header>
        <main>
          <section>
            <div className="label">Current Projects</div>
            <div className="listing">
              <ul>
                <li>Project one</li>
                <li>Project two</li>
                <li>Project three</li>
              </ul>
            </div>
              <button className="create-project" onClick={()=>addProject()}>Create a New Project</button>
          </section>
          <section>
            <div className="label">Project Data</div>
          </section>
        </main>
        <dialog ref={modalRef}>
            hi there
            <button onClick={()=>modalRef.current?.close()}>cancel</button>
        </dialog>
      </>
    );
}