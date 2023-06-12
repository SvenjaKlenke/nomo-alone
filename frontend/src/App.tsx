import React from 'react';
import logo from './Logo.png';
import './App.css';
import TaskCardGallery from "./gallery/TaskCardGallery";
import {Route, Routes} from "react-router-dom";
import useTasks from "./hook/useTasks";

function App() {

    const {getAllTasks, tasksList} = useTasks()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
        <Routes>
            <Route path="/"
                   element={<TaskCardGallery allTasks={tasksList} getAllTasks={getAllTasks}/>}/>
        </Routes>
    </div>
  );
}

export default App;
