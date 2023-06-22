import React from 'react';
import {useNavigate} from "react-router-dom";

function Homepage() {

    const navigate = useNavigate();

    function clickForAllTasks() {
        navigate('/tasks');

    }

    function clickForTasksPlaydate() {
        navigate('/tasks/playdate');
    }

    function clickForTasksAppointment() {
        navigate('/tasks/appointment');
    }

    function clickForTasksVisit() {
        navigate('/tasks/visit');
    }

    function clickForTasksShopping() {
        navigate('/tasks/shopping');
    }

    return (
        <div>
            <button className="Buttons" onClick={clickForTasksPlaydate}>Playdate</button>
            <button className="Buttons" onClick={clickForTasksAppointment}>Appointment</button>
            <button className="Buttons" onClick={clickForTasksVisit}>Visit</button>
            <button className="Buttons" onClick={clickForTasksShopping}>Shopping</button>
            <button className="Buttons" onClick={clickForAllTasks}>All Tasks</button>
        </div>
    );
}

export default Homepage;