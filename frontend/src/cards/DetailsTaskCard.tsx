import React from 'react';
import './DetailsTaskCard.css';
import {TaskModel} from "../model/TaskModel";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

type Props = {
    allTasks: TaskModel[];
    user: string | undefined;
}

function DetailsTaskCard(props: Props) {
    const params = useParams();
    const id: string | undefined = params.id;

    const actualTask: TaskModel | undefined = props.allTasks.find(currentTask => currentTask.id === id);

    const navigate = useNavigate();
    const authorizedUser = actualTask?.creator === props.user;

    function clickForDelete() {
        axios.delete("/tasks/" + actualTask?.id)
            .then(r => navigate(-1))
    }

    function clickForEdit() {
        navigate("/edit/" + actualTask?.id);
    }

    function goBack() {
        navigate("/" + actualTask?.category);
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
                    {authorizedUser && (
                        <button className="ButtonsDetailsCard" onClick={clickForDelete}>Delete</button>
                    )}
                    {authorizedUser && (
                        <button className="ButtonsDetailsCard" onClick={clickForEdit}>Edit</button>
                    )}
                </div>
                <div className="BackButton">
                    <button className="RoundButton" onClick={goBack}>Back</button>
                </div>
            </div>
        </div>
    );
}

export default DetailsTaskCard;
