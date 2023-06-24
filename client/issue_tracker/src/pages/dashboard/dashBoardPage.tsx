import { useEffect, useRef, useState } from "react";
import "./style.css";
import AddProjectForm from "./dialogForm";
import axios, { Axios } from "axios";
import { apis } from "../../const/api-const";
import { ProjectListInterface, Projects, formState } from "./interfaces";
import { NavLink, useNavigate } from "react-router-dom";
import CreateProjectForm from "./createProjectForm";
import DialogForm from "../../components/UI/dialog/dialog";
import DashBoardDialog from "./dialogForm";
import { useRecoilState } from "recoil";
import { currentUser } from "../../store/store";

export default function DashBoardPage() {
  const [toggleForm, setToggleForm] = useState(false);
  const [projectList, setProjectList] = useState<Projects[]>([]);
  const [user, setUser] = useRecoilState(currentUser) 
  const navigate = useNavigate();

  const addProject = () => {
    setToggleForm((prev) => !prev);
  };
  const fetchProjects = async () => {
    const payload = {
      id: user.id,
    };
    const res = await axios.post<ProjectListInterface>(apis.GET_PROJECTS, payload);
    console.log({ res });
    const listData = res.data.projects;
    setProjectList(listData);
  };


  async function createProject(data: formState) {
    console.log({ data });
    let payload = {...data,
      startDate : new Date(data.startDate).toISOString(),
      endDate : new Date(data.endDate).toISOString(),
      userId: user.id}
    try {
      let res = await axios.post(apis.CREATE_PROJECT,payload)
      console.log({res})
      if(res.status){
        console.log(res)
        await fetchProjects()
        setToggleForm((prev) => !prev);
      }
      else throw(res)
    }
    catch(err){

    }
  }

  const navigateToProject=(id : number)=>{
    navigate(`/project/${id}`)
  }
  // init
  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <>
      <header>
        <span>Dashboard</span>
        {/* <span>logout</span> */}
        <NavLink to={"/project"}>project</NavLink>
      </header>
      <main>
        <section>
          <div className="label">Current Projects</div>
          <div className="listing">
            <ul>
              {projectList.map((list) => {
                return (
                  <>
                    <li key={list.UserId} onClick={()=>navigateToProject(list.ID)}>{list?.Name}</li>
                  </>
                );
              })}
            </ul>
          </div>
          <button className="create-project" onClick={() => addProject()}>
            Create a New Project
          </button>
        </section>
        <section>
          <div className="label">Project Data</div>
        </section>
      </main>
      <DashBoardDialog
        toggle={toggleForm}
        setToggle={setToggleForm}
        // component={}
        heading="Add New Project"
      > 
        {<CreateProjectForm submit={createProject} />}
      </DashBoardDialog>
    </>
  );
}
