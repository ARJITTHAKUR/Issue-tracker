export interface ProjectListInterface {
  projects: Project[];
  user: { [key: string]: any };
}
export interface Project {
  DeletedAt: Date;
  ID: number;
  projectname: string;
  UserId: number;
  Tasks: { [key: string]: any }[];
  CreatedAt: Date;
  UpdatedAt: Date;
}

export interface formState {
  projectname : string,
  startDate : Date,
  endDate : Date,
  description : string 
}