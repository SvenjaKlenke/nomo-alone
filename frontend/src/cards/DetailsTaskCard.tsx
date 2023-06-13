import React from 'react';
import './DetailsTaskCard.css';
import {Task} from "../model/TaskModel";
import {Link, useParams} from "react-router-dom";

type Props = {
    allTasks: Task [];
}

function DetailsTaskCard(props: Props) {

    const params = useParams();
    const id: string | undefined = params.id;

    const actualTask: Task | undefined = props.allTasks.find(currentTask => currentTask.id === id);

    {
        console.log("Test")
    }

    return (
        <div className="Detailstaskcard">
            <div className="Smallcard">
                <p>Creator:</p>
                <p>{actualTask?.creator}</p>
            </div>
            <div className="Smallcard">
                <p>Taskname:</p>
                <p>{actualTask?.name}</p>
            </div>
            <div className="Smallcard">
                <p>Createdate:</p>
                <p>{actualTask?.createDate}</p>
            </div>
            <div className="Smallcard">
                <p>Deadline:</p>
                <p>{actualTask?.deadline}</p>
            </div>
            <div>
                <Link className="link" to={"/"}>back</Link>
            </div>
        </div>
    );
}

export default DetailsTaskCard;