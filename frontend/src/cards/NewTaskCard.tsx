import React from 'react';
import './NewTaskCard.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {TaskModel} from "../model/TaskModel";
import useToday from "../hook/useToday";
import useFields from "../hook/useFields";
import CardComponents from "../element/CardComponents";
import {toast} from "react-toastify";

type Props = {
    username: string
};

function NewTaskCard(props: Props) {

    const navigate = useNavigate();
    const {getTodayDate} = useToday();
    const {
        handleDateChange,
        handleInputChange,
        setInputCategory,
        setInputAmoundOfPeople,
        selectedDate,
        inputAmoundOfPeople,
        inputCategory,
        inputDescription,
        inputTaskName
    } = useFields();

    function addNewTask() {
        if (
            inputTaskName.trim() === '' ||
            inputCategory.trim() === '' ||
            selectedDate === null ||
            inputDescription.trim() === '' ||
            inputAmoundOfPeople === null
        ) {
            toast.error('Please fill in all fields.')
            return;
        }
        const newTask: TaskModel = {
            id: '',
            creator: props.username,
            category: inputCategory,
            name: inputTaskName,
            createDate: getTodayDate(),
            deadline: selectedDate,
            amoundOfPeople: inputAmoundOfPeople,
            text: inputDescription,
            assigneeName: []
        };

        axios.post('/api/tasks', newTask).then(r => {
            navigate(-1);
            toast.success("New task has been added!");
        })
    }

    function cancelAddNewTask() {
        navigate(-1);
    }

    return (
        <div>
            <h1>New Task</h1>
            <div className="NewEditCard">
                <CardComponents handleDateChange={handleDateChange} handleInputChange={handleInputChange}
                                inputAmoundOfPeople={inputAmoundOfPeople} inputCategory={inputCategory}
                                inputDescription={inputDescription}
                                inputTaskName={inputTaskName} selectedDate={selectedDate}
                                setInputAmoundOfPeople={setInputAmoundOfPeople} setInputCategory={setInputCategory}/>
                <div className="ButtonsContainer">
                    <button className="ButtonsNewEdit" onClick={addNewTask}>
                        Add
                    </button>
                    <button className="ButtonsNewEdit" onClick={cancelAddNewTask}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>

    );
}

export default NewTaskCard;
