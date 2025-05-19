import React, {useState} from 'react';
import axios from "axios";
import './Login.css';

function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const loginUser = async () => {
        try {
            const response = await axios.post('http://localhost:3005/login', {
                userId: userId,
                password: password
            });
            alert(response.data.message);
            localStorage.setItem('username', userId);
            localStorage.setItem('token', response.data.token);
            window.location.href = '/'
        } catch (error) {
            console.error('Login error:', error);
            alert(error.response?.data);
        }
    };
    return (
        <div className="form">
            <h1>Login to Your News Portal</h1>
            <input type="text" placeholder="Username" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={loginUser}>Login</button>
            <p>Don't have an account? <a href="/register">Register</a></p>
            <p style={{ position: "fixed", bottom: 5, left:0,width: "100%", textAlign: "center", background: "orange", margin: 0}}>
                © Developed by Mustafa Emir Tezcan.
            </p>
        </div>
    );
}

export default Login;