
export const env = `http://127.0.0.1:8080/tasktracker/api/user`
// export const env = `http://143.244.138.63:80/tasktracker/api/user`
// export const host = `http://127.0.0.1:8080`\
export const host = `http://143.244.138.63:80`

export const apis = {
    lOGIN : `${host}/tasktracker/login`,
    GET_PROJECTS : `${host}/tasktracker/api/user/getProjects`,
    CREATE_PROJECT : `${host}/tasktracker/api/user/createProject`,
    CREATE_TASK : `${host}/tasktracker/api/user/createTask`,
    GET_TASKS : `${host}/tasktracker/api/user/getTasks`,
    SET_TO_PLANNING : `${host}/tasktracker/api/user/changeTaskStatus/`,
    SET_TO_INPROGRESS : `${host}/tasktracker/api/user/changeTaskStatus/`,
    SET_TO_COMPLETE : `${host}/tasktracker/api/user/changeTaskStatus/`,
    GET_ALL_PROJECT_DATA : `${host}/tasktracker/api/user/getUserProjectData`
}