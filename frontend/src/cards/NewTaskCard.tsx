import React, {ChangeEvent, useState} from 'react';
import './NewTaskCard.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {TaskModel} from "../model/TaskModel";
import {format} from 'date-fns';
import useToday from "../hook/useToday";

function NewTaskCard() {
    const [inputTaskName, setInputTaskName] = useState('');
    const [inputCreator, setInputCreator] = useState('');
    const [inputCategory, setInputCategory] = useState('');
    const {getTodayDate} = useToday();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [inputDescription, setInputDescription] = useState('');
    const [inputAmoundOfPeople, setInputAmoundOfPeople] = useState<number | null>(null);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const navigate = useNavigate();
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };


    function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const {name, value} = event.target;

        switch (name) {
            case 'taskName':
                setInputTaskName(value);
                break;
            case 'creator':
                setInputCreator(value);
                break;
            case 'category':
                setInputCategory(value);
                break;
            case 'description':
                setInputDescription(value);
                break;
            case 'amoundOfPeople':
                setInputAmoundOfPeople(Number(value));
                break;
            default:
                break;
        }
    }

    function addNewTask() {
        if (
            inputTaskName.trim() === '' ||
            inputCreator.trim() === '' ||
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
            creator: inputCreator,
            category: inputCategory,
            name: inputTaskName,
            createDate: getTodayDate(),
            deadline: format(selectedDate, 'dd.MM.yyyy'),
            amoundOfPeople: inputAmoundOfPeople,
            text: inputDescription
        };

        axios.post('/tasks', newTask).then(r => navigate("/"))
    }
    function cancelAddNewTask() {
        navigate('/');
    }

    return (
        <div>
            <h1>New Task</h1>
            {isAlertVisible && (
                <div className="alert-message">
                    Please fill in all fields.
                </div>
            )}
            <div className="Detailstaskcard">
                <label htmlFor="taskName">Task Name</label>
                <textarea
                    id="taskName"
                    name="taskName"
                    placeholder="Give your task a name"
                    value={inputTaskName}
                    onChange={handleInputChange}
                ></textarea>

                <label htmlFor="creator">Creator</label>
                <textarea
                    id="creator"
                    name="creator"
                    placeholder="Creator"
                    value={inputCreator}
                    onChange={handleInputChange}
                ></textarea>

                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    value={inputCategory}
                    onChange={(event) => setInputCategory(event.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="PLAYDATE">Playdate</option>
                    <option value="APPOINTMENT">Appointment</option>
                    <option value="VISIT">Visit</option>
                    <option value="SHOPPING">Shopping</option>
                </select>

                <label htmlFor="deadline">Deadline</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    placeholderText="Select Deadline"
                    dateFormat="dd.MM.yyyy"
                    className="custom-datepicker"
                />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Give your task a Description"
                    value={inputDescription}
                    onChange={handleInputChange}
                ></textarea>

                <label htmlFor="amoundOfPeople">Amount of People</label>
                <select
                    id="amoundOfPeople"
                    name="amoundOfPeople"
                    value={inputAmoundOfPeople || ''}
                    onChange={(event) => setInputAmoundOfPeople(Number(event.target.value))}
                >
                    <option value="">How many people do you need?</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <div className="ButtonsContainer">
                    <button className="Buttons" onClick={addNewTask}>
                        Add
                    </button>
                    <button className="Buttons" onClick={cancelAddNewTask}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewTaskCard;
