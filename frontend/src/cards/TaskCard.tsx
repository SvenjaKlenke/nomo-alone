import React from 'react';
import {Task} from "../model/TaskModel";
import './TaskCard.css';
import {useNavigate} from "react-router-dom";

type Props = {
    task: Task
}

function TaskCard(props:Props) {

    const navigate = useNavigate();

    function clickForDetails() {
        navigate("/task/" + props.task.id)
    }

    return (
        <div className="Taskcard">
            <div className="Smallcard">
                <p>Creator:</p>
                <p>{props.task.creator}</p>
            </div>
            <div className="Smallcard">
                <p>Taskname:</p>
                <p>{props.task.name}</p>
            </div>
            <div className="Smallcard">
                <p>Createdate:</p>
                <p>{props.task.createDate}</p>
            </div>
            <div className="Smallcard">
                <p>Deadline:</p>
                <p>{props.task.deadline}</p>
            </div>
            <div>
                <button className="Buttons" onClick={clickForDetails}>Details</button>
            </div>
        </div>
    );
}

export default TaskCard;