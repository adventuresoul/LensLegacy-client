import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        instagramUsername: '',
        password: '',
        profilePhotoUrl: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            setToken(storedToken);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create an object with only the fields that have values
        const updateFields = {};
        Object.keys(formData).forEach(key => {
            if (formData[key]) {
                updateFields[key] = formData[key];
            }
        });

        try {
            const response = await axios.put(
                'http://localhost:9000/update', // Adjust the URL to match your endpoint
                updateFields,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response.status);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile', error);
            alert('Error updating profile');
        }
    };

    return (
        <div>
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div>
                    <label>Instagram Username:</label>
                    <input type="text" name="instagramUsername" value={formData.instagramUsername} onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div>
                    <label>Profile Photo URL:</label>
                    <input type="text" name="profilePhotoUrl" value={formData.profilePhotoUrl} onChange={handleChange} />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateProfile;
