import React, {useEffect} from 'react';
import {TaskModel} from "../model/TaskModel";
import './TaskCard.css';
import {useNavigate} from "react-router-dom";
import useUrl from "../hook/useUrl";

type Props = {
    task: TaskModel
}

function TaskCard(props:Props) {

    const navigate = useNavigate();
    const {saveBackUrl} = useUrl()


    useEffect(() => {
            saveBackUrl();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []);

    function clickForDetails() {
        saveBackUrl();
        navigate("/tasks/" + props.task.id)
    }

    return (
        <div className="Taskcard">
            <button className="CountButton" onClick={clickForDetails}>
                {props.task.assigneeName.length === props.task.amoundOfPeople ? "Full" : props.task.assigneeName.length}
            </button>
            <label htmlFor="taskName">Taskname:</label>
            <div className="Smallcard">
                <p>{props.task.name}</p>
            </div>
            <label htmlFor="creator">Creator:</label>
            <div className="Smallcard">
                <p>{props.task.creator}</p>
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