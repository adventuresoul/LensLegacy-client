import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewPosts.css';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Post from '../../Components/Post/Post';

function ViewPosts() {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            setToken(storedToken);
            getPosts(storedToken);
        } else {
            navigate('/login');
        }
    }, []); // Empty dependency array ensures this effect runs once on mount

    // Retrieve all posts of the current user
    const getPosts = async (token) => {
        try {
            const response = await axios.get(`http://127.0.0.1:9000/posts/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosts(response.data);
        } catch (error) {
            console.error('Error: ' + error.message);
            alert('Please try again later.');
        }
    };

    return (
        <div className="viewposts-container">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <Post
                        key={post._id}
                        imageLink={post.imageLink}
                        category={post.category}
                        title={post.title}
                        description={post.description}
                    />
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
}

export default ViewPosts;
