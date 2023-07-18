import { useEffect, useRef, useState } from "react";
import "./style.css";
import AddProjectForm from "./dialogForm";
import axios, { Axios } from "axios";
import { apis } from "../../const/api-const";
import { ProjectListInterface, Project, formState } from "./interfaces";
import { NavLink, useNavigate } from "react-router-dom";
import CreateProjectForm from "./createProjectForm";
import DialogForm from "../../components/UI/dialog/dialog";
import DashBoardDialog from "./dialogForm";
import { useRecoilState } from "recoil";
import { currentProject, currentUser } from "../../store/store";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { FolderPlusIcon } from "@heroicons/react/24/solid";
import {TrashIcon} from "@heroicons/react/24/outline"
import List from "./list";
import { Pie, PieChart } from "recharts";

export default function DashBoardPage() {
  const [toggleForm, setToggleForm] = useState(false);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [user, setUser] = useRecoilState(currentUser);
  const [currentSelectedProject, setCurrentSelectedProject] = useRecoilState(currentProject)
  const [visualData, setVisualData] = useState([])
  const navigate = useNavigate();

  const addProject = () => {
    setToggleForm((prev) => !prev);
  };
  const getProjects = async () => {
    try {const res = await axios.get<ProjectListInterface>(
      `${apis.GET_PROJECTS}/${user.id}`
    );
    console.log({ res });
    const listData = res.data.projects;
    setProjectList((prev) => listData);
      
    } catch (error) {
      console.error(error)
    }
    
  };

  async function createProject(data: formState) {
    console.log({ data });
    let payload = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      userId: Number(user.id),
    };
    // console.log({ payload });
    try {
      let res = await axios.post(apis.CREATE_PROJECT, payload);
      console.log({ res });
      if (res.status) {
        console.log(res);
        await getProjects();
        setToggleForm((prev) => !prev);
      } else throw res;
    } catch (err) {
      console.error(err);
    }
  }

  const navigateToProject = (id: number) => {
    const selectedProject = projectList.find(ele=>ele.ID === id)
    setCurrentSelectedProject(prev => selectedProject as any)
    navigate(`/project/${id}`);
  };
  const getVisualProjectData = async()=>{
    try {
      type taskData = {
        tasks : {
          [key : string] : string[]
        }
      }
      const res = await axios.get(`${apis.GET_ALL_PROJECT_DATA}/${user.id}`)
      const data : taskData = res.data
      let modified = []
      // console.log({data})
      
      if(data.tasks && Object.entries(data.tasks).length > 0){
        for(let [key,value] of Object.entries(data.tasks)){
          modified.push({value,length:value.length})
        }
        console.log(modified)
        setVisualData(modified)
      }
    } catch (error) {
      console.error(error)
    }
  }
  // init
  useEffect(() => {
    getProjects();
    getVisualProjectData()
  }, [user]);
  return (
    <>
      <header>
        <span>Dashboard</span>
      </header>
      <main>
        <section>
          <div className="label">Current Projects</div>
          <div className="listing">
            
            <List
              projectList={projectList}
              onListItemClick={(id) => {
                navigateToProject(id);
              }}
            />
          </div>
          <button
            className="create-project"
            onClick={() => addProject()}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              gap: 8,
              alignItems: "center",
            }}
          >
            <span>Create a New Project</span>
            <span>
              <FolderPlusIcon height={30} width={30} />
            </span>
          </button>
        </section>
        <section className="chart-container">
          <div className="label">Project Data</div>
          <div className="pieChart">
            <PieChart width={500} height={500}>
              <Pie
                data={visualData}
                dataKey="length"
                nameKey="value"
                cx="50%"
                cy="50%"
                outerRadius={200}
                fill="#8884d8"
                label
              />
            </PieChart>
            <div className="chart-label">Number of tasks per project</div>
          </div>
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
