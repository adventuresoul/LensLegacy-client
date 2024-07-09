import './SignupPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    // content validators
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const validatePhone = (phone) => {
        const re = /^\d{10}$/;
        return re.test(phone);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        const validators = {}
        if(!validateEmail(email)){
            validators.email = 'Invalid email format';
        }
        if(!validatePhone(phone)){
            validators.phone = 'Invalid phone number, Phonenumber must be 10 digits';
        }
        if(Object.keys(validators).length > 0){
            setErrors(validators);
            return;
        }

        const body = {
            username,
            email,
            phone,
            password
        };

        try {
            const response = await axios.post('http://127.0.0.1:9000/users', body);
            if (response.status === 200) {
                navigate('/login');
            } 
            else {
                alert("Registration failed: " + response.statusText);
                navigate('/signup');
            }
        } catch (error) {
            console.error('Error: ' + error.message);
            alert('Registration failed. Please try again later.');
        }
    };

    return (
        <div className="signup-container-wrapper">
            <div className="signup-container">
                <form onSubmit = { handleSubmit }>
                    <label htmlFor="username">User Name:</label>
                    <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <p>{errors.email}</p>}
                    <br />
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    {errors.phone && <p>{errors.phone}</p>}
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <button type="submit">Register</button>
                </form>
                <div className="link-container">
                    <p>Already have an account? <Link to="/login" className="login-link">Log In</Link></p>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
