import React, {ChangeEvent, useEffect, useState} from 'react';
import './NewTaskCard.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import useTasks from '../hook/useTasks';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function NewTaskCard() {
    const [inputTaskName, setInputTaskName] = useState('');
    const [inputCreator, setInputCreator] = useState('');
    const [inputCategory, setInputCategory] = useState('');
    const [createdate, setCreatedate] = useState<string>(getTodayDate());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [inputDescription, setInputDescription] = useState('');
    const [inputAmoundOfPeople, setInputAmoundOfPeople] = useState<number | null>(null);
    const navigate = useNavigate();
    const {getAllTasks} = useTasks();


    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        setCreatedate(getTodayDate());
    }, []);

    function useTextInput(event: ChangeEvent<HTMLTextAreaElement>) {
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
        axios.post('/tasks', {description: inputDescription, status: 'OPEN'}).then(getAllTasks);
    }

    function cancelAddNewTask() {
        navigate('/');
    }

    function getTodayDate(): string {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <div>
            <h1>New Task</h1>
            <div className="Detailstaskcard">
                <label htmlFor="taskName">Task Name</label>
                <textarea
                    id="taskName"
                    name="taskName"
                    placeholder="Give your task a name"
                    value={inputTaskName}
                    onChange={useTextInput}
                ></textarea>

                <label htmlFor="creator">Creator</label>
                <textarea
                    id="creator"
                    name="creator"
                    placeholder="Creator"
                    value={inputCreator}
                    onChange={useTextInput}
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
                    className="custom-datepicker"
                />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Give your task a Description"
                    value={inputDescription}
                    onChange={useTextInput}
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
