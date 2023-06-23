import React from 'react';
import './App.css';
import TaskCardGallery from "./gallery/TaskCardGallery";
import {Route, Routes} from "react-router-dom";
import useTasks from "./hook/useTasks";
import DetailsTaskCard from "./cards/DetailsTaskCard";
import NewTaskCard from "./cards/NewTaskCard";
import EditTaskCard from "./cards/EditTaskCard";
import Header from "./element/Header";
import Homepage from "./gallery/Homepage";

function App() {

    const {getAllTasks, tasksList} = useTasks()

  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/tasks"
                   element={<TaskCardGallery allTasks={tasksList} getAllTasks={getAllTasks} category="TASKS"/>}/>
            <Route path="/visit"
                   element={<TaskCardGallery allTasks={tasksList} getAllTasks={getAllTasks} category="VISIT"/>}/>
            <Route path="/playdate"
                   element={<TaskCardGallery allTasks={tasksList} getAllTasks={getAllTasks} category="PLAYDATE"/>}/>
            <Route path="/appointment"
                   element={<TaskCardGallery allTasks={tasksList} getAllTasks={getAllTasks} category="APPOINTMENT"/>}/>
            <Route path="/shopping"
                   element={<TaskCardGallery allTasks={tasksList} getAllTasks={getAllTasks} category="SHOPPING"/>}/>

            <Route path="tasks/:id" element={<DetailsTaskCard allTasks={tasksList}/>}/>
            <Route path="new" element={<NewTaskCard/>}/>
            <Route path="edit/:id" element={<EditTaskCard taskModels={tasksList}/>}/>
        </Routes>
    </div>
  );
}

export default App;
