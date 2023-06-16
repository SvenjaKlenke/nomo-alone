import React from 'react';
import logo from './Logo.png';
import './App.css';
import TaskCardGallery from "./gallery/TaskCardGallery";
import {Route, Routes} from "react-router-dom";
import useTasks from "./hook/useTasks";
import DetailsTaskCard from "./cards/DetailsTaskCard";
import NewTaskCard from "./cards/NewTaskCard";

function App() {

    const {getAllTasks, tasksList} = useTasks()

  return (
    <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
      </header>
        <Routes>
            <Route path="/" element={
                <TaskCardGallery allTasks={tasksList} getAllTasks={getAllTasks}/>
            }/>
            <Route path="tasks/:id" element={<DetailsTaskCard allTasks={tasksList}/>}/>
            <Route path="new" element={<NewTaskCard/>}/>
        </Routes>

    </div>
  );
}

export default App;
