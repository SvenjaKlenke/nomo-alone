import React from 'react';
import './DetailsTaskCard.css';
import {TaskModel} from '../model/TaskModel';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

type Props = {
    allTasks: TaskModel[];
    user: string | undefined;
};

function DetailsTaskCard(props: Props) {
    const params = useParams();
    const id: string | undefined = params.id;

    const actualTask: TaskModel | undefined = props.allTasks.find(
        currentTask => currentTask.id === id
    );

    const navigate = useNavigate();
    const authorizedUser = actualTask?.creator === props.user;
    const dontShowButtons = actualTask?.creator !== props.user;

    function clickForDelete() {
        axios.delete('/tasks/' + actualTask?.id).then(r => navigate(-1));
    }

    function clickForEdit() {
        navigate('/edit/' + actualTask?.id);
    }

    function goBack() {
        navigate('/' + actualTask?.category);
    }

    return (
        <div>
            <h1>{actualTask?.name}</h1>
            <div
                className={`Detailstaskcard ${dontShowButtons ? 'without-buttons' : ''}`}
            >
                <div className="FieldContainer">
                    <label htmlFor="creator">Creator:</label>
                    <div className="Smallline">
                        <p>{actualTask?.creator}</p>
                    </div>
                </div>
                <div className="FieldContainer">
                    <label htmlFor="category">Category:</label>
                    <div className="Smallline">
                        <p>{actualTask?.category}</p>
                    </div>
                </div>
                <div className="DateContainer">
                    <div className="FieldContainer">
                        <label htmlFor="createdate">Createdate:</label>
                        <div className="Smallline2">
                            <p>{actualTask?.createDate}</p>
                        </div>
                    </div>
                    <div className="FieldContainer">
                        <label htmlFor="deadline">Deadline:</label>
                        <div className="Smallline2">
                            <p>{actualTask?.deadline}</p>
                        </div>
                    </div>
                </div>
                <div className="FieldContainer">
                    <label htmlFor="description">Description:</label>
                    <div className="Textblock">
                        <p>{actualTask?.text}</p>
                    </div>
                </div>
                <div className="FieldContainer">
                    <label htmlFor="amoundOfPeople">Amount of People:</label>
                    <div className="Smallline">
                        <p>{actualTask?.amoundOfPeople}</p>
                    </div>
                </div>
                <div className="ButtonContainer">
                    {authorizedUser && (
                        <button className="ButtonsDetailsCard" onClick={clickForDelete}>
                            Delete
                        </button>
                    )}
                    {authorizedUser && (
                        <button className="ButtonsDetailsCard" onClick={clickForEdit}>
                            Edit
                        </button>
                    )}
                </div>
                <div className="BackButton">
                    <button className="RoundButton" onClick={goBack}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DetailsTaskCard;
