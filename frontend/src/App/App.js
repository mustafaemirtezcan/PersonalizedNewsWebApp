import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Homepage from '../Homepage/Homepage';
import Portal from '../Portal/Portal';
import Categories from '../Category/Categories';

function App() {
    const isAuthenticated = !!localStorage.getItem('token');
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                    <Route path="/portal" element={isAuthenticated ? <Portal /> : <Navigate to="/login" />} />
                    <Route path="/sport" element={<Categories category="Sport" />} />
                    <Route path="/economy" element={<Categories category="Economy" />} />
                    <Route path="/technology" element={<Categories category="Technology" />} />
                    <Route path="/science" element={<Categories category="Science" />} />
                    <Route path="/health" element={<Categories category="Health" />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}
export default App;
