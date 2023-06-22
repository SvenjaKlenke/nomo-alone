import React from 'react';
import {useNavigate} from "react-router-dom";

function Homepage() {

    const navigate = useNavigate();

    function clickForAllTasks() {
        navigate('/tasks');

    }

    return (
        <div>
            <button className="Buttons" onClick={clickForAllTasks}>All Tasks</button>
        </div>
    );
}

export default Homepage;