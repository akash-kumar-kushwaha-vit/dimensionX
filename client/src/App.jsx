import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import LostItems from './pages/LostItems';
import FoundItems from './pages/FoundItems';
import PostItem from './pages/PostItem';
import Profile from './pages/Profile';
import './index.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/lost-items"
                        element={
                            <PrivateRoute>
                                <LostItems />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/found-items"
                        element={
                            <PrivateRoute>
                                <FoundItems />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/post-item"
                        element={
                            <PrivateRoute>
                                <PostItem />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
