import React from 'react';
import {Task} from "../model/TaskModel";
import TaskCard from "../cards/TaskCard";

type Props = {
    allTasks: Task[],
    getAllTasks: ()=>void,
}

function TaskCardGallery(props:Props) {
    return (
        <div className={"taskcardgallery"}>
            {props.allTasks.map(task => <TaskCard key={task.id} task={task}/>)}
        </div>
    );
}

export default TaskCardGallery;