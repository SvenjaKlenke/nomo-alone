import React from 'react';
import {useNavigate} from "react-router-dom";
import './Homepage.css'

function Homepage() {

    const navigate = useNavigate();
    function clickForTasksPlaydate() {
        navigate('/playdate');
    }

    function clickForTasksAppointment() {
        navigate('/appointment');
    }

    function clickForTasksVisit() {
        navigate('/visit');
    }

    function clickForTasksShopping() {
        navigate('/shopping');
    }

    return (
        <div>
            <h1>Choose a Category</h1>
            <div className="ButtonContainerHomepage">
                <button className="ButtonsHomepage" onClick={clickForTasksPlaydate}>Playdate</button>
                <button className="ButtonsHomepage" onClick={clickForTasksAppointment}>Appointment</button>
                <button className="ButtonsHomepage" onClick={clickForTasksVisit}>Visit</button>
                <button className="ButtonsHomepage" onClick={clickForTasksShopping}>Shopping</button>
            </div>
        </div>
    );
}

export default Homepage;