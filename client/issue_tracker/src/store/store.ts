import { atom, selector } from "recoil";
import { Project } from "../pages/dashboard/interfaces";
import { object } from "zod";

interface user {
  id: number ;
  name: string;
}
// export const currentUser = atom({
//   key: "currentUser",
//   default: {
//     id: 0,
//     name: '',
//   } satisfies user,

// });
export const currentUser = selector({
  key: "currentUser",
  get:()=>{
    return JSON.parse(sessionStorage.getItem("user") || "{}")
  }
  
});

export const setCurrentUser = atom({
  key :"setCurrentUser",
  default: {
    id: 0,
    name: '',
  } satisfies user,

})
type project = Project | null
export const currentProject = atom({
  key : "currentProject",
  default : {
    DeletedAt: new Date(),
    ID: 0,
    projectname: '',
    UserId: 0,
    Tasks: [],
    CreatedAt: new Date(),
    UpdatedAt:new Date(),
  } satisfies project
})