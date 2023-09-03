import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login/login";
import DashBoardPage from "./pages/dashboard/dashBoardPage";
import NotFound from "./pages/notFound";
import "../src/styles/globalstyle.css";
import Toast from "./components/UI/toast/toast";
import { ToastContext } from "./context/toastContext";
import { useEffect, useState } from "react";
import Project from "./pages/project/projectPage";
import { useRecoilState } from "recoil";
import { currentUser } from "./store/store";
import { checkAuthOnNav, shouldNavToLogin } from "./services/auth";

const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: LoginPage,
      loader: shouldNavToLogin,
    },
    {
      path: "/dashboard",
      Component: DashBoardPage,
      loader: checkAuthOnNav,
    },
    {
      path: "/project/:id",
      Component: Project,
      loader: checkAuthOnNav,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    basename: "/tasktracker/",
  }
);

function App() {
  const [toggleToast, setToggleToast] = useState(false);
  const [user, setNewUser] = useRecoilState(currentUser);

  function showToast() {
    setToggleToast(true);
    const timer = setTimeout(() => {
      setToggleToast(false);
      clearTimeout(timer);
    }, 3000);
  }

  useEffect(() => {
    const activeUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    console.log({ activeUser });
    if (activeUser.name) {
      setNewUser(activeUser);
    }
  }, []);
  return (
    <>
      <ToastContext.Provider value={{ showToast }}>
        <RouterProvider router={router} />
        {toggleToast && <Toast />}
      </ToastContext.Provider>
    </>
  );
}

export default App;
