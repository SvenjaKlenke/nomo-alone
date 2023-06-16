import React from 'react';
import './DetailsTaskCard.css';
import {TaskModel} from "../model/TaskModel";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

type Props = {
    allTasks: TaskModel [];
}

function DetailsTaskCard(props: Props) {

    const params = useParams();
    const id: string | undefined = params.id;

    const actualTask: TaskModel | undefined = props.allTasks.find(currentTask => currentTask.id === id);

    const navigate = useNavigate();

    function clickForDelete() {
        axios.delete("/tasks/" + actualTask?.id)
            .then(r => navigate("/"))
    }

    function clickForEdit() {
        axios.put("/tasks/" + actualTask?.id)
            .then(r => navigate("/edit"))

    }

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
                <div className="DateContainer">
                    <div className="Smallline2">
                        <h2>Createdate: <br/>{actualTask?.createDate}</h2>
                    </div>
                    <div className="Smallline2">
                        <h2>Deadline: <br/>{actualTask?.deadline}</h2>
                    </div>
                </div>
                <div className="Textblock">
                    <h2>{actualTask?.text}</h2>
                </div>
                <div className="Smallline">
                    <h2>Amount of People: {actualTask?.amoundOfPeople}</h2>
                </div>
                <div className="ButtonContainer">
                    <button className="ButtonsDetailsCard" onClick={clickForDelete}>Delete</button>
                    <button className="ButtonsDetailsCard" onClick={clickForEdit}>Edit</button>
                </div>
                <div className="Links">
                    <Link className="link" to={"/"}>back</Link>
                </div>
            </div>
        </div>
    );
}

export default DetailsTaskCard;