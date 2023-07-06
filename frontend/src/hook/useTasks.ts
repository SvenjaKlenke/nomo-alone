import axios from "axios";
import {useState} from "react";
import {TaskModel} from "../model/TaskModel";


function useTasks() {

    const [tasksList, setTasksList] = useState<TaskModel[]>([])

    function getAllTasks() {
        axios.get("/api/tasks")
            .then((response) => {
                setTasksList(response.data)
            }).catch((e) => console.log(e.message))
    }
    return {getAllTasks, tasksList};
}

export default useTasks;