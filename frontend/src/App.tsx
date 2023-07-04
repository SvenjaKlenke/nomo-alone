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
import RegisterPage from "./login/RegisterPage";
import {ToastContainer} from "react-toastify";

function App() {

    const {getAllTasks, tasksList} = useTasks()
    const {login, logout, user, getUsername} = useUserModel()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getUsername, [])

    return (
        <div className="App">
            {user === "" || user === "anonymousUser" || user === undefined ? <> </> : <Header logout={logout}/>}
            <ToastContainer/>
            <Routes>
                <Route path={"/login"} element={<LoginPage login={login}/>}/>
                <Route path={"/register"} element={<RegisterPage/>}/>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path="/" element={<Homepage/>}/>
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
                    <Route path="/mytasks"
                           element={<TaskCardGallery allTasks={tasksList} getAllTasks={getAllTasks}
                                                     category="mytasks"/>}/>
                    <Route path="tasks/:id" element={<DetailsTaskCard allTasks={tasksList}/>}/>
                    <Route path="new" element={<NewTaskCard username={user || ''}/>}/>
                    <Route path="edit/:id" element={<EditTaskCard taskModels={tasksList} username={user || ''}/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
