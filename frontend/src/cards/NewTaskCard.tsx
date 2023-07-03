import React, {useState} from 'react';
import './NewTaskCard.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {TaskModel} from "../model/TaskModel";
import {format} from 'date-fns';
import useToday from "../hook/useToday";
import useFields from "../hook/useFields";
import CardComponents from "../element/CardComponents";
import useUserModel from "../login/useUserModel";

function NewTaskCard() {

    const navigate = useNavigate();
    const {getTodayDate} = useToday();
    const {user} = useUserModel();
    const [isAlertVisible, setIsAlertVisible] = useState(false);
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
            setIsAlertVisible(true);
            return;
        }
        const newTask: TaskModel = {
            id: '',
            creator: user || '',
            category: inputCategory,
            name: inputTaskName,
            createDate: getTodayDate(),
            deadline: format(selectedDate, 'dd.MM.yyyy'),
            amoundOfPeople: inputAmoundOfPeople,
            text: inputDescription
        };

        axios.post('/tasks', newTask).then(r => navigate(-1))
    }

    function cancelAddNewTask() {
        navigate(-1);
    }

    return (
        <div>
            <h1>New Task</h1>
            {isAlertVisible && (
                <div className="alert-message">
                    Please fill in all fields.
                </div>
            )}
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

    );
}

export default NewTaskCard;
