import React, {useState} from 'react';
import './DetailsTaskCard.css';
import {TaskModel} from '../model/TaskModel';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

type Props = {
    allTasks: TaskModel[];
    user: string | undefined;
    backUrl: string;
};

function DetailsTaskCard(props: Props) {
    const params = useParams();
    const id: string | undefined = params.id;

    const actualTask: TaskModel | undefined = props.allTasks.find(
        currentTask => currentTask.id === id
    );

    const navigate = useNavigate();
    const authorizedUser = actualTask?.creator === props.user;
    const [showPopup, setShowPopup] = useState(false);
    const [showJoinPopup, setShowJoinPopup] = useState(false);
    const [showMaxParticipantsPopup, setShowMaxParticipantsPopup] = useState(false);

    const handleClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleCloseJoinPopup = () => {
        setShowJoinPopup(false);
    };

    const handleCloseMaxParticipantsPopup = () => {
        setShowMaxParticipantsPopup(false);
    };

    const assigneeNames = actualTask?.assigneeName;
    const assigneeCount = assigneeNames?.length;

    function clickForDelete() {
        axios.delete('/api/tasks/' + actualTask?.id).then(r => navigate(-1));
    }

    function clickForEdit() {
        if (assigneeNames && props.user && assigneeNames.includes(props.user)) {
            setShowJoinPopup(true);
            return;
        }

        if (assigneeCount === actualTask?.amoundOfPeople) {
            setShowMaxParticipantsPopup(true);
            return;
        }

        navigate('/edit/' + actualTask?.id);
    }

    function goBack() {
        window.location.replace(props.backUrl);
    }

    function clickForJoin() {
        if (assigneeNames && props.user && assigneeNames.includes(props.user)) {
            setShowJoinPopup(true);
            return;
        }

        if (assigneeCount === actualTask?.amoundOfPeople) {
            setShowMaxParticipantsPopup(true);
            return;
        }

        navigate('/edit/' + actualTask?.id);
    }

    return (
        <div>
            <h1>{actualTask?.name}</h1>
            <div className="Detailstaskcard">
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
                    <div className="AmountOfPeople">
                        <label htmlFor="amoundOfPeople">Amount of People:</label>
                        <button className="CountButtonDetails" onClick={handleClick}>
                            {assigneeCount === actualTask?.amoundOfPeople ? 'Full' : assigneeCount ?? 'None'}
                        </button>

                        {showPopup && (
                            <div className="popup">
                                <div className="popup-content">
                                    {assigneeCount ? (
                                        <ol>
                                            {assigneeNames?.map((name, index) => (
                                                <li key={index}>{name}</li>
                                            ))}
                                        </ol>
                                    ) : (
                                        <p>No one has signed up yet.</p>
                                    )}
                                    <button className="ButtonsDetailsCard" onClick={handleClosePopup}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
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
                    {!authorizedUser && (
                        <button className="ButtonsDetailsCard" onClick={clickForJoin}>
                            Join
                        </button>
                    )}
                </div>
                <div className="BackButton">
                    <button className="RoundButton" onClick={goBack}>
                        Back
                    </button>
                </div>
            </div>

            {showJoinPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>You have already joined this task.</p>
                        <button className="ButtonsDetailsCard" onClick={handleCloseJoinPopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {showMaxParticipantsPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>The maximum number of participants has been reached.</p>
                        <button className="ButtonsDetailsCard" onClick={handleCloseMaxParticipantsPopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetailsTaskCard;
