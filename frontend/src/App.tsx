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
    const {getAllTasks, tasksList} = useTasks();
    const {login, logout, user, getUsername} = useUserModel();
    const backUrl = localStorage.getItem('backUrl') ?? '';

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getUsername(), [])

    return user === undefined ? null : (
        <div className="App">
            {user === "" || user === "anonymousUser" ? (
                <> </>
            ) : (
                <Header logout={logout}/>
            )}
            <ToastContainer/>
            <Routes>
                <Route path={"/login"} element={<LoginPage login={login}/>}/>
                <Route path={"/register"} element={<RegisterPage/>}/>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route
                        path="/visit"
                        element={
                            <TaskCardGallery
                                allTasks={tasksList}
                                getAllTasks={getAllTasks}
                                category="VISIT"
                                user={user}
                            />
                        }
                    />
                    <Route
                        path="/playdate"
                        element={
                            <TaskCardGallery
                                allTasks={tasksList}
                                getAllTasks={getAllTasks}
                                category="PLAYDATE"
                                user={user}
                            />
                        }
                    />
                    <Route
                        path="/appointment"
                        element={
                            <TaskCardGallery
                                allTasks={tasksList}
                                getAllTasks={getAllTasks}
                                category="APPOINTMENT"
                                user={user}
                            />
                        }
                    />
                    <Route
                        path="/shopping"
                        element={
                            <TaskCardGallery
                                allTasks={tasksList}
                                getAllTasks={getAllTasks}
                                category="SHOPPING"
                                user={user}
                            />
                        }
                    />
                    <Route
                        path="/mytasks"
                        element={
                            <TaskCardGallery
                                allTasks={tasksList}
                                getAllTasks={getAllTasks}
                                category="mytasks"
                                user={user}
                            />
                        }
                    />
                    <Route
                        path="tasks/:id"
                        element={
                            <DetailsTaskCard
                                allTasks={tasksList}
                                user={user}
                                backUrl={backUrl}
                            />
                        }
                    />
                    <Route path="new" element={<NewTaskCard username={user || ''}/>}/>
                    <Route
                        path="edit/:id"
                        element={
                            <EditTaskCard
                                taskModels={tasksList}
                                username={user || ''}
                                getAllTasks={getAllTasks}/>
                        }
                    />
                    <Route path="/" element={<Homepage/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
