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

export default function DashBoardPage() {
  const [toggleForm, setToggleForm] = useState(false);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [user, setUser] = useRecoilState(currentUser);
  const [currentSelectedProject, setCurrentSelectedProject] = useRecoilState(currentProject)
  const navigate = useNavigate();

  const addProject = () => {
    setToggleForm((prev) => !prev);
  };
  const getProjects = async () => {
    const res = await axios.get<ProjectListInterface>(
      `${apis.GET_PROJECTS}/${user.id}`
    );
    console.log({ res });
    const listData = res.data.projects;
    setProjectList((prev) => listData);
  };

  async function createProject(data: formState) {
    console.log({ data });
    let payload = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      userId: Number(user.id),
    };
    console.log({ payload });
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
  // init
  useEffect(() => {
    getProjects();
  }, [user]);
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
              {projectList?.map((list) => {
                return (
                  <>
                    <li
                      key={list.UserId}
                      onClick={() => navigateToProject(list.ID)}
                    >
                      {list?.projectname}
                    </li>
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
