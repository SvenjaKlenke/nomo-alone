import React from 'react';
import DatePicker from "react-datepicker";
import useFields from "../hook/useFields";
import '../cards/NewTaskCard.css';

function CardComponents() {

    const {
        handleDateChange,
        handleInputChange,
        setInputCategory,
        setInputAmoundOfPeople,
        selectedDate,
        inputAmoundOfPeople,
        inputCreator,
        inputCategory,
        inputDescription,
        inputTaskName
    } = useFields();

    return (
        <div>
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
            </div>
        </div>
    );
}

export default CardComponents;