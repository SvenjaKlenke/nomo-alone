import React, {useEffect} from 'react';
import './App.css';
import TaskCardGallery from "./gallery/TaskCardGallery";
import {Route, Routes} from "react-router-dom";
import useTasks from "./hook/useTasks";
import DetailsTaskCard from "./cards/DetailsTaskCard";
import NewTaskCard from "./cards/NewTaskCard";
import EditTaskCard from "./cards/EditTaskCard";
import Header from "./element/Header";
import Homepage from "./gallery/Homepage";
import LoginPage from "./login/LoginPage";
import useUserModel from "./login/useUserModel";
import ProtectedRoutes from "./login/ProtectedRoutes";

function App() {

    const {getAllTasks, tasksList} = useTasks()
    const {login, user, getUsername} = useUserModel()

    useEffect(() => getUsername, [])

    return (
        <div className="App">
            {user === "" || user === "anonymousUser" ? <> </> : <Header/>}
            <Routes>
                <Route path={"/login"} element={<LoginPage login={login}/>}/>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/tasks"
                           element={<TaskCardGallery allTasks={tasksList} getAllTasks={getAllTasks}
                                                     category="TASKS"/>}/>
                    <Route path="/visit"
                           element={<TaskCardGallery allTasks={tasksList} getAllTasks={getAllTasks}
                                                     category="VISIT"/>}/>
                    <Route path="/playdate"
                           element={<TaskCardGallery allTasks={tasksList} getAllTasks={getAllTasks}
                                                     category="PLAYDATE"/>}/>
                    <Route path="/appointment"
                           element={<TaskCardGallery allTasks={tasksList} getAllTasks={getAllTasks}
                                                     category="APPOINTMENT"/>}/>
                    <Route path="/shopping"
                           element={<TaskCardGallery allTasks={tasksList} getAllTasks={getAllTasks}
                                                     category="SHOPPING"/>}/>

                    <Route path="tasks/:id" element={<DetailsTaskCard allTasks={tasksList}/>}/>
                    <Route path="new" element={<NewTaskCard/>}/>
                    <Route path="edit/:id" element={<EditTaskCard taskModels={tasksList}/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
