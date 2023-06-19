import { useRef, useState } from "react";
import "./style.css"
import AddProjectForm from "./dialogForm";
export default function DashBoardPage(){
    const [toggleForm, setToggleForm] = useState(false);
    const addProject = ()=>{
        setToggleForm(prev=>!prev)
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
        <AddProjectForm toggle={toggleForm} setToggle={setToggleForm}/>
      </>
    );
}