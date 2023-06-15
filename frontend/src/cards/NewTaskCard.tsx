import React, {ChangeEvent, useEffect, useState} from 'react';
import './NewTaskCard.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import useTasks from '../hook/useTasks';

function NewTaskCard() {
    const [inputTaskName, setInputTaskName] = useState('');
    const [inputCreator, setInputCreator] = useState('');
    const [inputCategory, setInputCategory] = useState('');
    const [inputCreatedate, setInputCreatedate] = useState('');
    const [inputDeadline, setInputDeadline] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [inputAmoundOfPeople, setInputAmoundOfPeople] = useState<number | null>(null);
    const navigate = useNavigate();
    const {getAllTasks} = useTasks();

    const today = getTodayDate();

    useEffect(() => {
        setInputCreatedate(today);
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
            case 'deadline':
                setInputDeadline(value);
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
                <textarea
                    id="deadline"
                    name="deadline"
                    placeholder="Deadline"
                    value={inputDeadline}
                    onChange={useTextInput}
                ></textarea>

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
                    <option value="">Select Amount of People</option>
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
