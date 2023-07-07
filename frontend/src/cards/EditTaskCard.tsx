import React, {useEffect} from 'react';
import './NewTaskCard.css';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {TaskModel} from "../model/TaskModel";
import useToday from "../hook/useToday";
import useFields from "../hook/useFields";
import CardComponents from "../element/CardComponents";
import {toast} from "react-toastify";

type Props = {
    taskModels: TaskModel[];
    username: string
};

function EditTaskCard(props: Props) {

    const params = useParams();
    const id: string | undefined = params.id;
    const actualTask: TaskModel | undefined = props.taskModels.find(currentTask => currentTask.id === id);
    const authorizedUser = actualTask?.creator === props.username;
    const navigate = useNavigate();
    const {getTodayDate} = useToday();
    const {
        handleInputChange,
        handleDateChange,
        setInputTaskName,
        setInputCreator,
        setInputCategory,
        setInputDescription,
        setSelectedDate,
        setInputAmoundOfPeople,
        selectedDate,
        inputAmoundOfPeople,
        inputCategory,
        inputDescription,
        inputTaskName
    } = useFields();


    useEffect(() => {
        if (actualTask) {
            setInputTaskName(actualTask.name);
            if (actualTask.creator !== undefined) {
                setInputCreator(actualTask.creator);
            }
            setInputCategory(actualTask.category);
            setSelectedDate(actualTask.deadline);
            setInputDescription(actualTask.text);
            setInputAmoundOfPeople(actualTask.amoundOfPeople);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actualTask]);


    function updatedTask() {
        if (
            inputTaskName.trim() === '' ||
            inputCategory.trim() === '' ||
            selectedDate === null ||
            inputDescription.trim() === '' ||
            inputAmoundOfPeople === null
        ) {
            toast.error('Please fill in all fields.');
            return;
        }
        const assigneeName = authorizedUser
            ? actualTask?.assigneeName ?? [] : [props.username, ...(actualTask?.assigneeName ?? [])];

        const updatedTask: TaskModel = {
            id: actualTask?.id ?? '',
            creator: authorizedUser ? props.username : actualTask?.creator,
            category: inputCategory,
            name: inputTaskName,
            createDate: getTodayDate(),
            deadline: selectedDate,
            amoundOfPeople: inputAmoundOfPeople,
            text: inputDescription,
            assigneeName: assigneeName
        };


        axios.put('/api/tasks/' + actualTask?.id, updatedTask).then(r => {
            navigate(-1);
            toast.success("Update successful!");
        })

    }

    function cancelUpdateTask() {
        navigate("/tasks/" + actualTask?.id);
    }


    return (
        <div>
            <h1>Edit Task</h1>
            <div className="NewEditCard">
                <CardComponents handleDateChange={handleDateChange} handleInputChange={handleInputChange}
                                inputAmoundOfPeople={inputAmoundOfPeople} inputCategory={inputCategory}
                                inputDescription={inputDescription}
                                inputTaskName={inputTaskName} selectedDate={selectedDate}
                                setInputAmoundOfPeople={setInputAmoundOfPeople} setInputCategory={setInputCategory}/>
                <div className="ButtonsContainer">
                    {authorizedUser && (
                        <button className="ButtonsNewEdit" onClick={updatedTask}>
                            Update
                        </button>
                    )}
                    {!authorizedUser && (
                        <button className="ButtonsNewEdit" onClick={updatedTask}>
                            Submit
                        </button>
                    )}
                    <button className="ButtonsNewEdit" onClick={cancelUpdateTask}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditTaskCard;
