import axios from "axios";
import {useState} from "react";
import {Task} from "../model/TaskModel";


function useTasks() {

    const [tasksList, setTasksList] = useState<Task[]>([])

    function getAllTasks() {
        axios.get("/tasks")
            .then((response) => {
                setTasksList(response.data)
            }).catch((e) => console.log(e.message))
    }
    return {getAllTasks, tasksList};
}

export default useTasks;