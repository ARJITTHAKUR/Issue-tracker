
export const env = `http://127.0.0.1:3000/api/user`

export const apis = {
    GET_PROJECTS : `${env}/getProjects`,
    CREATE_PROJECT : `${env}/createProject`,
    CREATE_TASK : `${env}/createTask`,
    GET_TASKS : `${env}/getTasks`,
    SET_TO_PLANNING : `${env}/changeTaskStatus/`,
    SET_TO_INPROGRESS : `${env}/changeTaskStatus/`,
    SET_TO_COMPLETE : `${env}/changeTaskStatus/`,
}