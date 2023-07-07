import {ChangeEvent, useState} from "react";
import {format} from "date-fns";

function UseFields() {
    const [inputTaskName, setInputTaskName] = useState("");
    const [inputCreator, setInputCreator] = useState("");
    const [inputCategory, setInputCategory] = useState("");
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [inputDescription, setInputDescription] = useState("");
    const [inputAmoundOfPeople, setInputAmoundOfPeople] = useState<number | null>(null);

    const handleDateChange = (date: Date | null) => {
        const formattedDate = date ? format(date, "dd.MM.yyyy") : null;
        setSelectedDate(formattedDate);
    };

    function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const {name, value} = event.target;

        switch (name) {
            case "taskName":
                setInputTaskName(value);
                break;
            case "creator":
                setInputCreator(value);
                break;
            case "category":
                setInputCategory(value);
                break;
            case "description":
                setInputDescription(value);
                break;
            case "amoundOfPeople":
                setInputAmoundOfPeople(Number(value));
                break;
            default:
                break;
        }
    }

    return {
        handleDateChange,
        handleInputChange,
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
        inputTaskName,
    };
}

export default UseFields;
