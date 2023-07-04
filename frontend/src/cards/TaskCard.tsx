import React from 'react';
import {TaskModel} from "../model/TaskModel";
import './TaskCard.css';
import {useNavigate} from "react-router-dom";

type Props = {
    task: TaskModel
}

function TaskCard(props:Props) {

    const navigate = useNavigate();

    function clickForDetails() {
        navigate("/tasks/" + props.task.id)
    }

    return (
        <div className="Taskcard">
            <label htmlFor="creator">Creator:</label>
            <div className="Smallcard">
                <p>{props.task.creator}</p>
            </div>
            <label htmlFor="taskName">Taskname:</label>
            <div className="Smallcard">
                <p>{props.task.name}</p>
            </div>
            <label htmlFor="deadline">Deadline:</label>
            <div className="Smallcard">
                <p>{props.task.deadline}</p>
            </div>
            <div>
                <button className="Buttons" onClick={clickForDetails}>Details</button>
            </div>
        </div>
    );
}

export default TaskCard;