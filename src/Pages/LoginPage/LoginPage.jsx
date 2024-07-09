import './LoginPage.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Cookies from 'js-cookie';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // set router params
    const navigate = useNavigate();
    const location = useLocation();
    const prevRoute = location.state?.from || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            email,
            password
        };

        try {
            const response = await axios.post('http://127.0.0.1:9000/users/login', body);
            if (response.status === 200) {
                // Extract token from response data
                const token = response.data.token;
                
                // set timer for 60 min
                const expirationTime = new Date();
                expirationTime.setTime(expirationTime.getTime() + (60 * 60 * 1000));

                // Store the token in a cookie
                Cookies.set('token', token, { expires: expirationTime, path: '/' });
                
                // Redirect to home or prev route
                navigate(prevRoute);
            } else {
                alert("Login failed: " + response.statusText);
            }
        } catch (error) {
            console.error('Error: ' + error.message);
            alert('Login failed. Please try again later.');
        }
    };

    return (
        <div className="login-container-wrapper">
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <button type="submit">Login</button>
                </form>
                <div className="link-container">
                    <p>Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
