import React, {ChangeEvent} from 'react';
import DatePicker from "react-datepicker";
import '../cards/NewTaskCard.css';

type Props = {
    handleDateChange: (date: Date | null) => void,
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void,
    setInputCategory: (value: string) => void,
    setInputAmoundOfPeople: (number: number | null) => void,
    selectedDate: string;
    inputAmoundOfPeople: number | null,
    inputCategory: string,
    inputDescription: string,
    inputTaskName: string
}

function CardComponents(props: Props) {
    const parsedSelectedDate = props.selectedDate ? new Date(props.selectedDate) : null;

    const handleDatePickerChange = (date: Date | null) => {
        props.handleDateChange(date);
    };

    return (
        <div className="CardComponents">
            <label htmlFor="taskName">Taskname:</label>
            <textarea
                id="taskName"
                name="taskName"
                placeholder="Give your task a name"
                value={props.inputTaskName}
                onChange={props.handleInputChange}
            ></textarea>

            <label htmlFor="category">Category:</label>
            <select
                id="category"
                name="category"
                value={props.inputCategory}
                onChange={(event) => props.setInputCategory(event.target.value)}
            >
                <option value="">Select Category</option>
                <option value="PLAYDATE">Playdate</option>
                <option value="APPOINTMENT">Appointment</option>
                <option value="VISIT">Visit</option>
                <option value="SHOPPING">Shopping</option>
            </select>

            <label htmlFor="deadline">Deadline:</label>
            <DatePicker
                selected={parsedSelectedDate}
                onChange={handleDatePickerChange}
                placeholderText="Select Deadline"
                dateFormat="dd.MM.yyyy"
                className="custom-datepicker"
            />

            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                name="description"
                placeholder="Give your task a Description"
                value={props.inputDescription}
                onChange={props.handleInputChange}
            ></textarea>

            <label htmlFor="amoundOfPeople">Amount of People:</label>
            <select
                id="amoundOfPeople"
                name="amoundOfPeople"
                value={props.inputAmoundOfPeople ?? ''}
                onChange={(event) => props.setInputAmoundOfPeople(Number(event.target.value))}
            >
                <option value="">How many people do you need?</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    );
}

export default CardComponents;
