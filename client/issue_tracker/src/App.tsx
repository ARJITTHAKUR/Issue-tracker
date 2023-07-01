import {
  Route,
  Routes,
  NavLink,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login/login";
import DashBoardPage from "./pages/dashboard/dashBoardPage";
import NotFound from "./pages/notFound";
import "../src/styles/globalstyle.css";
import Toast from "./components/UI/toast/toast";
import { ToastContext } from "./context/toastContext";
import { useEffect, useState } from "react";
import Project from "./pages/project/projectPage";
import { RecoilRoot, useRecoilState } from "recoil";
import { currentUser } from "./store/store";
const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/dashboard",
    Component: DashBoardPage,
  },
  {
    path: "/project/:id",
    Component: Project,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  const [toggleToast, setToggleToast] = useState(false);
  const [user,setNewUser] = useRecoilState(currentUser) 

  function showToast() {
    setToggleToast(true);
    const timer = setTimeout(() => {
      setToggleToast(false);
      clearTimeout(timer);
    }, 3000);
  }
  
  useEffect(() => {
    const activeUser = JSON.parse(sessionStorage.getItem('user') || '{}')
    console.log({activeUser})
    if(activeUser.name){
      setNewUser(activeUser)
    }
  }, []);
  return (
    <>
      {/* <nav>
      <ul>
        <li><NavLink to={'/'}>login </NavLink></li>
        <li><NavLink to={'/dashboard'}>dashboard</NavLink></li>

      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
        
      <Route path="/dashboard" element={<DashBoardPage/>}/>
      <Route path="*" element={<NotFound/>}/>

    </Routes> */}

      <ToastContext.Provider value={{ showToast }}>
        <RouterProvider router={router} />
        {toggleToast && <Toast />}
      </ToastContext.Provider>
    </>
  );
}

export default App;
