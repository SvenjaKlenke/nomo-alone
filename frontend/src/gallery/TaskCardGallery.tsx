import React, {useEffect, useState} from 'react';
import {TaskModel} from "../model/TaskModel";
import TaskCard from "../cards/TaskCard";
import './TaskCardGallery.css';
import {useNavigate} from "react-router-dom";

type Props = {
    allTasks: TaskModel[],
    getAllTasks: () => void,
    category: string | undefined,
    user: string | undefined
}

function TaskCardGallery(props: Props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        props.getAllTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let tasksToDisplay: TaskModel[] = [];

    if (props.category === undefined || props.category === "mytasks") {
        tasksToDisplay = props.allTasks.filter(currentTask => currentTask.creator === props.user);
    } else if (["VISIT", "APPOINTMENT", "SHOPPING", "PLAYDATE"].includes(props.category)) {
        tasksToDisplay = props.allTasks.filter(currentTask => currentTask.category === props.category);
    }

    let categoryText = "";

    if (props.category === "mytasks") {
        categoryText = "My Tasks";
    } else if (props.category) {
        categoryText = props.category.charAt(0).toUpperCase() + props.category.slice(1).toLowerCase();
    }

    function clickToNewTask() {
        navigate("/new");
    }

    function goBack() {
        navigate("/");
    }

    useEffect(() => {
        if (props.allTasks.length > 0) {
            setIsLoading(false);
        }
    }, [props.allTasks])

    return (
        <div>
            <div className="Headline">
                <h1>{categoryText}</h1>
                <div className="AddButton">
                    <button className="RoundButton" onClick={clickToNewTask}>New Task</button>
                </div>
            </div>
            {isLoading ? (
                <div className="loader">Loading...</div>
            ) : (
                <div>
                    <div className="Taskcardgallery">
                        {tasksToDisplay.length === 0 ? (
                            <h6>There are no tasks available yet. <br/>You can add a task by clicking the "New Task"
                                button.</h6>
                        ) : (
                            tasksToDisplay.map(task => <TaskCard key={task.id} task={task}/>)
                        )}
                    </div>
                    <div className="BackButton">
                        <button className="RoundButton" onClick={goBack}>Back</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskCardGallery;
