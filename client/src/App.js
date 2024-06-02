import React, {useMemo, useEffect, useState} from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import socket from "./socket/index";

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const isAuth = useSelector((state) => state.token);

    useEffect(() => {
        if (isAuth) {
            socket.connect();
        }
        return () => {
            if (isAuth) {
                socket.disconnect();
            }
        };
    }, [isAuth]);

    return (
        <div className="App">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route
                            path="/home"
                            element={isAuth ? <HomePage /> : <Navigate to="/" />}
                        />
                        <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
