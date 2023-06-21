import React, {useEffect, useState} from 'react';
import './NewTaskCard.css';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {TaskModel} from "../model/TaskModel";
import {format} from "date-fns";
import useToday from "../hook/useToday";
import useFields from "../hook/useFields";
import CardComponents from "../element/CardComponents";

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
            <CardComponents handleDateChange={handleDateChange} handleInputChange={handleInputChange}
                            inputAmoundOfPeople={inputAmoundOfPeople} inputCategory={inputCategory}
                            inputCreator={inputCreator} inputDescription={inputDescription}
                            inputTaskName={inputTaskName} selectedDate={selectedDate}
                            setInputAmoundOfPeople={setInputAmoundOfPeople} setInputCategory={setInputCategory}/>
            <div className="ButtonsContainer">
                <button className="Buttons" onClick={updatedTask}>
                    Update
                </button>
                <button className="Buttons" onClick={cancelUpdateTask}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default EditTaskCard;