export interface ProjectListInterface {
  projects: Projects[];
  user: { [key: string]: any };
}
export interface Projects {
  DeletedAt: Date;
  ID: number;
  Name: string;
  UserId: number;
  Tasks: { [key: string]: any }[];
  CreatedAt: Date;
  UpdatedAt: Date;
}
