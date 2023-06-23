
import { Route, Routes, NavLink, createBrowserRouter, RouterProvider} from "react-router-dom"
import LoginPage from './pages/login'
import DashBoardPage from './pages/dashboard'
import NotFound from './pages/notFound'
import "../src/styles/globalstyle.css"
import Toast from "./components/UI/toast/toast"
import { ToastContext } from "./context/toastContext"
import { useState } from "react"
import Project from "./pages/project"
import { RecoilRoot } from "recoil"
const router = createBrowserRouter([
  {
    path : '/',
    Component : LoginPage,
  },
  {
    path : '/dashboard',
    Component : DashBoardPage
  },
  {
    path : '/project/:id',
    Component : Project
  },
  {
    path : '*',
    element : <NotFound/>
  }
])

function App() {
const [toggleToast, setToggleToast] = useState(false);
function showToast (){
  setToggleToast(true)
  const timer = setTimeout(()=>{
    setToggleToast(false)
    clearTimeout(timer)
  },3000)

}
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
    <RecoilRoot>

    <ToastContext.Provider value={{showToast}}>

    <RouterProvider router={router}/>
    {toggleToast &&
      <Toast/>
    }
    </ToastContext.Provider>
    </RecoilRoot>
    </>
  )
}

export default App
