import './NewPost.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function NewPost() {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageLink, setImageLink] = useState('');

    // useEffect hook to get token after page is mounted
    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            setToken(storedToken);
        } else {
            navigate('/login');
        }
    }, []); // Empty dependency array ensures this effect runs once on mount

    // handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'imageLink':
                setImageLink(value);
                break;
            default:
                break;
        }
    };

    // upload the post
    const uploadPost = async (e) => {
        e.preventDefault();

        const body = {
            title,
            description,
            category,
            imageLink
        };

        try {
            const response = await axios.post('http://127.0.0.1:9000/posts', body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                navigate('/myPosts');
            } else {
                alert('Failed to upload post.');
            }
        } catch (error) {
            console.error('Error uploading post:', error);
            alert('Failed to upload post. Please try again later.');
        }
    };

    return (
        <div className="newpost-container-wrapper">
            <div className="newpost-container">
                <form onSubmit={uploadPost}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" value={title} onChange={handleChange} required />
                    <br />
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" id="description" value={description} onChange={handleChange} required />
                    <br />
                    <label htmlFor="category">Category:</label>
                    <select name="category" id="category" value={category} onChange={handleChange} required>
                        <option value="" disabled hidden>Choose here</option>
                        <option value="wildlife">Wildlife</option>
                        <option value="wedding">Wedding</option>
                        <option value="city">City</option>
                        <option value="street">Street</option>
                        <option value="portrait">Portrait</option>
                    </select>
                    <br />
                    <label htmlFor="imageLink">Image Link:</label>
                    <input type="text" name="imageLink" id="imageLink" value={imageLink} onChange={handleChange} required />
                    <br />
                    <button type="submit">Publish</button>
                </form>
            </div>
        </div>
    );
}

export default NewPost;
