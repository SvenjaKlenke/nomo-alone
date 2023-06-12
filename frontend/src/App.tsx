import React from 'react';
import logo from './Logo.png';
import './App.css';
import TaskCardGallery from "./gallery/TaskCardGallery";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
        <Routes>
            <Route path={"/tasks"}
            element={<TaskCardGallery allTasks={tasks}/>}/>
        </Routes>
    </div>
  );
}

export default App;
