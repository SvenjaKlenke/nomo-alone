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

    return (
        <div>
            <h1>{actualTask?.name}</h1>
            <div className="Detailstaskcard">
                <div className="Smallline">
                    <h2>Creator: {actualTask?.creator}</h2>
                </div>
                <div className="Smallline">
                    <h2>Category: {actualTask?.category}</h2>
                </div>
                <div className="Smallline2">
                    <h2>Createdate: <br/>{actualTask?.createDate}</h2>
                </div>
                <div className="Smallline2">
                    <h2>Deadline: <br/>{actualTask?.deadline}</h2>
                </div>
                <div className="Textblock">
                    <h2>Text: <br/>{actualTask?.text}</h2>
                </div>
                <div className="Smallline">
                    <h2>Amount of People: {actualTask?.amoundOfPeople}</h2>
                </div>
                <div className="Links">
                    <Link className="link" to={"/"}>back</Link>
                </div>
            </div>
        </div>
    );
}

export default DetailsTaskCard;