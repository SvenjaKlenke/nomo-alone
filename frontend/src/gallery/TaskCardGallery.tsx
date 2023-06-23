import React, {useEffect} from 'react';
import {TaskModel} from "../model/TaskModel";
import TaskCard from "../cards/TaskCard";
import './TaskCardGallery.css';
import {useNavigate} from "react-router-dom";

type Props = {
    allTasks: TaskModel[],
    getAllTasks: () => void,
    category: string | undefined
}

function TaskCardGallery(props: Props) {

    const navigate = useNavigate();

    useEffect(() => {
        props.getAllTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let tasksToDisplay: TaskModel[] = [];

    if (props.category === undefined || props.category === "TASKS") {
        tasksToDisplay = props.allTasks;
    } else if (["VISIT", "APPOINTMENT", "SHOPPING", "PLAYDATE"].includes(props.category)) {
        tasksToDisplay = props.allTasks.filter(currentTask => currentTask.category === props.category);
    }

    function clickToNewTask() {
        navigate("/new");
    }

    return (
        <div>
            <div className="Headline">
                <h1>{props.category === "tasks" ? "All Tasks" : props.category ? props.category.charAt(0).toUpperCase() + props.category.slice(1).toLowerCase() : ""}</h1>
                <div className="ButtonContainerRoundButton">
                    <button className="RoundButton" onClick={clickToNewTask}>New Task</button>
                </div>
            </div>
            <div className="Taskcardgallery">
                {tasksToDisplay.length === 0 ? (
                    <h6>There are no tasks available yet. <br/>You can add a task by clicking the "New Task" button.
                    </h6>
                ) : (
                    tasksToDisplay.map(task => <TaskCard key={task.id} task={task}/>)
                )}
            </div>
        </div>
    );
}

export default TaskCardGallery;
