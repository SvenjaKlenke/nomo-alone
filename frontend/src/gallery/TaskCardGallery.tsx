import React, {useEffect} from 'react';
import {Task} from "../model/TaskModel";
import TaskCard from "../cards/TaskCard";
import './TaskCardGallery.css';

type Props = {
    allTasks: Task[],
    getAllTasks: () => void
}

function TaskCardGallery(props:Props) {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        props.getAllTasks()
    }, [])
    return (
        <div className={"Taskcardgallery"}>
            {props.allTasks.map(task => <TaskCard key={task.id} task={task}/>)}
        </div>
    );
}

export default TaskCardGallery;