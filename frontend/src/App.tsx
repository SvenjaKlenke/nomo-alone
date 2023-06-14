import React from 'react';
import logo from './Logo.png';
import './App.css';
import TaskCardGallery from "./gallery/TaskCardGallery";
import {Route, Routes} from "react-router-dom";
import useTasks from "./hook/useTasks";
import DetailsTaskCard from "./cards/DetailsTaskCard";

function App() {

    const {getAllTasks, tasksList} = useTasks()

  return (
    <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
      </header>
        <Routes>
            <Route path="/" element={
                <>
                    <h1>All Tasks</h1>
                    <TaskCardGallery allTasks={tasksList} getAllTasks={getAllTasks}/>
                </>
            }/>
            <Route path="tasks/:id" element={<DetailsTaskCard allTasks={tasksList}/>}/>
        </Routes>

    </div>
  );
}

export default App;
