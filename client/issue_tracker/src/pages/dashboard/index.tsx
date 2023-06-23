import { useEffect, useRef, useState } from "react";
import "./style.css"
import AddProjectForm from "./dialogForm";
import axios from "axios";
import { apis } from "../../const/api-const";
import { ProjectListInterface, Projects } from "./interfaces";


export default function DashBoardPage(){
    const [toggleForm, setToggleForm] = useState(false);
    const [projectList, setProjectList]= useState<Projects[]>([]);

    const addProject = ()=>{
        setToggleForm(prev=>!prev)
    }
    const fetchProjects= async()=>{
      const body = {
        id : 1
      }
      const res = await axios.post<ProjectListInterface>(apis.GET_PROJECTS,body)
      console.log({res})
      const listData = res.data.projects;
      setProjectList(listData)
    }
    // init
    useEffect(()=>{
      fetchProjects()
    },[])
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
                {
                  projectList.map((list)=>{
                    return <>
                      <li>{list?.Name}</li>
                    </>
                  })
                }
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