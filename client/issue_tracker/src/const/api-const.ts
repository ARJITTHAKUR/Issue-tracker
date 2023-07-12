
export const env = `http://127.0.0.1:8080/api/user`
// export const env = `http://143.244.138.63:8080/api/user`


export const apis = {
    lOGIN : `${env}/login`,
    GET_PROJECTS : `${env}/getProjects`,
    CREATE_PROJECT : `${env}/createProject`,
    CREATE_TASK : `${env}/createTask`,
    GET_TASKS : `${env}/getTasks`,
    SET_TO_PLANNING : `${env}/changeTaskStatus/`,
    SET_TO_INPROGRESS : `${env}/changeTaskStatus/`,
    SET_TO_COMPLETE : `${env}/changeTaskStatus/`,
}