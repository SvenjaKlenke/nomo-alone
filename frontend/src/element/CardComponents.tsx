import React, {ChangeEvent} from 'react';
import DatePicker from "react-datepicker";
import '../cards/NewTaskCard.css';

type Props = {
    handleDateChange: (date: Date | null) => void,
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
    setInputCategory: (value: string) => void,
    setInputAmoundOfPeople: (number: number) => void,
    selectedDate: Date | null,
    inputAmoundOfPeople: number | null,
    inputCreator: string,
    inputCategory: string,
    inputDescription: string,
    inputTaskName: string
}

function CardComponents(props: Props) {


    return (
        <div>
            <div className="Detailstaskcard">
                <label htmlFor="taskName">Task Name</label>
                <textarea
                    id="taskName"
                    name="taskName"
                    placeholder="Give your task a name"
                    value={props.inputTaskName}
                    onChange={props.handleInputChange}
                ></textarea>

                <label htmlFor="creator">Creator</label>
                <textarea
                    id="creator"
                    name="creator"
                    placeholder="Creator"
                    value={props.inputCreator}
                    onChange={props.handleInputChange}
                ></textarea>

                <label htmlFor="category">Category</label>
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

                <label htmlFor="deadline">Deadline</label>
                <DatePicker
                    selected={props.selectedDate}
                    onChange={props.handleDateChange}
                    placeholderText="Select Deadline"
                    dateFormat="dd.MM.yyyy"
                    className="custom-datepicker"
                />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Give your task a Description"
                    value={props.inputDescription}
                    onChange={props.handleInputChange}
                ></textarea>

                <label htmlFor="amoundOfPeople">Amount of People</label>
                <select
                    id="amoundOfPeople"
                    name="amoundOfPeople"
                    value={props.inputAmoundOfPeople || ''}
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
        </div>
    );
}

export default CardComponents;