import React from 'react';
import {Task} from "../model/TaskModel";

type Props = {
    task: Task
}

function TaskCard(props:Props) {
    return (
        <div className="Taskcard">
            <p>{props.task.creator}</p>
            <p>{props.task.name}</p>
            <p>{props.task.createDate}</p>
            <p>{props.task.deadline}</p>
        </div>
    );
}

export default TaskCard;