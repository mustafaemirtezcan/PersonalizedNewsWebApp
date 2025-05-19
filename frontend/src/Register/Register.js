import React ,{useState}from 'react';
import axios from "axios";
import './Register.css';

function Register() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        try {
            const response = await axios.post('http://localhost:3005/register', {
                userId: userId,
                password: password
            });
            alert(response.data);
            window.location.href = '/login'
        } catch (error) {
            alert(error.response?.data);
        }
    };
    return (
        <div className="form">
            <h1>Register to  Our News Portal</h1>
            <input type="text" placeholder="Username" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={registerUser}> Register </button>
            <p>Already have an account? <a href="/login">Login</a></p>
            <p style={{ position: "fixed", bottom: 5, left:0,width: "100%", textAlign: "center", background: "orange", margin: 0}}>
                © Developed by Mustafa Emir Tezcan.
            </p>
        </div>
    );
}

export default Register;