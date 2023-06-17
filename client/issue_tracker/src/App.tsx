
import { Route, Routes, NavLink, createBrowserRouter, RouterProvider} from "react-router-dom"
import LoginPage from './pages/login'
import DashBoardPage from './pages/dashboard'
import NotFound from './pages/notFound'
import "../src/styles/globalstyle.css"
const router = createBrowserRouter([
  {
    path : '/',
    Component : LoginPage,
  },
  {
    path : '/dashboard',
    Component : DashBoardPage
  },
  // {
  //   path : '/project'
  // }
  {
    path : '*',
    element : <NotFound/>
  }
])
function App() {

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
    <RouterProvider router={router}/>
    </>
  )
}

export default App
