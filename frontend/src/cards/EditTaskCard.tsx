import React, {useEffect, useState} from 'react';
import './NewTaskCard.css';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {TaskModel} from "../model/TaskModel";
import {format} from "date-fns";
import useToday from "../hook/useToday";
import useFields from "../hook/useFields";

type Props = {
    taskModels: TaskModel[];
};

function EditTaskCard(props: Props) {

    const params = useParams();
    const id: string | undefined = params.id;
    const actualTask: TaskModel | undefined = props.taskModels.find(currentTask => currentTask.id === id);
    const navigate = useNavigate();
    const {getTodayDate} = useToday();
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const {
        handleDateChange,
        handleInputChange,
        setInputTaskName,
        setInputCreator,
        setInputCategory,
        setInputDescription
        ,
        setSelectedDate,
        setInputAmoundOfPeople,
        selectedDate,
        inputAmoundOfPeople,
        inputCreator,
        inputCategory,
        inputDescription,
        inputTaskName
    } = useFields();

    useEffect(() => {
        if (actualTask) {
            setInputTaskName(actualTask.name);
            setInputCreator(actualTask.creator);
            setInputCategory(actualTask.category);
            setSelectedDate(null);
            setInputDescription(actualTask.text);
            setInputAmoundOfPeople(actualTask.amoundOfPeople);
        }
    }, [actualTask]);


    function updatedTask() {
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
        const updatedTask: TaskModel = {
            id: actualTask?.id ?? '',
            creator: inputCreator,
            category: inputCategory,
            name: inputTaskName,
            createDate: getTodayDate(),
            deadline: selectedDate ? format(selectedDate, 'dd.MM.yyyy') : '',
            amoundOfPeople: inputAmoundOfPeople,
            text: inputDescription
        };


        axios.put('/tasks/' + actualTask?.id, updatedTask).then(r => navigate("/"))
    }

    function cancelUpdateTask() {
        navigate("/tasks/" + actualTask?.id);
    }


    return (
        <div>
            <h1>Edit Task</h1>
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
                    <button className="Buttons" onClick={updatedTask}>
                        Update
                    </button>
                    <button className="Buttons" onClick={cancelUpdateTask}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditTaskCard;
