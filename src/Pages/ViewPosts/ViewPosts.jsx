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

    const deletePost = async (postId) => {
        try {
            await axios.delete(`http://127.0.0.1:9000/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosts(posts.filter(post => post._id !== postId));
        } 
        catch (error) {
            console.error('Error deleting post:', error.message);
            alert('Error deleting post. Please try again later.');
        }
    };

    return (
        <>
        <div className='viewposts-container'>
            <h1>My posts</h1>
        </div>
        <div className="viewposts-container">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className="post-container">
                        <Post
                            user={post.userId}
                            imageLink={post.imageLink}
                            category={post.category}
                            title={post.title}
                            description={post.description}
                        />
                        <button className="delete-button" onClick={() => deletePost(post._id)}>Delete</button>
                    </div>
                ))
            ) : (
                <h4>No posts available.</h4>
            )}
        </div>
        </>
        
    );
}

export default ViewPosts;
