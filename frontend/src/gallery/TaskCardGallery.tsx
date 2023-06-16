import React, {useEffect} from 'react';
import {TaskModel} from "../model/TaskModel";
import TaskCard from "../cards/TaskCard";
import './TaskCardGallery.css';
import {useNavigate} from "react-router-dom";

type Props = {
    allTasks: TaskModel[],
    getAllTasks: () => void
}

function TaskCardGallery(props: Props) {

    const navigate = useNavigate();

    useEffect(() => {
        props.getAllTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function clickToNewTask() {
        navigate("/new");
    }

    return (
        <div>
            <div className="Headline">
                <h1>All Tasks</h1>
                <div className="ButtonContainerRoundButton">
                    <button className="RoundButton" onClick={clickToNewTask}>New Task</button>
                </div>
            </div>
            <div className="Taskcardgallery">
                {props.allTasks.length === 0 ? (
                    <p>There are no tasks available yet. <br/>You can add a task by clicking the "New Task" button.</p>
                ) : (
                    props.allTasks.map(task => <TaskCard key={task.id} task={task}/>)
                )}
            </div>
        </div>
    );
}

export default TaskCardGallery;
