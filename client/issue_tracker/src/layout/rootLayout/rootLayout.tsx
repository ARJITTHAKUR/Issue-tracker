import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import NotFound from "../../pages/notFound";
import DashBoardPage from "../../pages/dashboard/dashBoardPage";

export default function RootLayout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to={"/login"}>login </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard"}>dashboard</NavLink>
          </li>
        </ul>
      </nav>
      {/* <Route>
      <Route path="/dashboard" element={<DashBoardPage/>}/>
      <Route path="*" element={<NotFound/>}/>
      </Route> */}
      <Outlet />
      rootLayout
    </>
  );
}
