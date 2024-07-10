import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Post from '../../Components/Post/Post';

function ViewProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [userProfile, setUserProfile] = useState({
        username: '',
        email: '',
        phone: '',
        profilePhotoUrl: ''
    });
    const [posts, setPosts] = useState([]);

    // useEffect hook to get token after page is mounted
    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            setToken(storedToken);
            getProfile(storedToken); 
            getPosts(storedToken);
        } else {
            navigate('/login');
        }
    }, [navigate]); // Dependency array ensures this effect runs once on mount

    const getProfile = async (storedToken) => {
        try {
            const profileResponse = await axios.get(`http://127.0.0.1:9000/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            }); 
            setUserProfile({
                username: profileResponse.data.name,
                email: profileResponse.data.email,
                phone: profileResponse.data.phone,
                profilePhotoUrl: profileResponse.data.profilePhotoUrl
            });
        } catch (error) {
            console.error('Error: ' + error.message);
            alert('Please try again later.'); 
        }
    };

    const getPosts = async (storedToken) => {
        try {
            const response = await axios.get(`http://127.0.0.1:9000/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });
            setPosts(response.data);
        } catch (error) {
            console.error('Error: ' + error.message);
            alert('Please try again later.');
        }
    };

    const viewPosts = () => {
        // Define this function to navigate to the posts view if needed
    };

    const uploadPost = () => {
        // Define this function to handle new post uploads
    };

    const logout = () => {
        // Define this function to handle user logout
        Cookies.remove('token');
        navigate('/login');
    };

    return (
        <>
            <div className="profile-container">
                <div className="profile-photo">
                    <img src={userProfile.profilePhotoUrl} alt="Profile" />
                </div>
                <div className="profile-info">
                    <h1>{userProfile.username}</h1>
                    <p>{userProfile.email}</p>
                    <p>Contact: {userProfile.phone}</p>
                </div>
                <div className="profile-links">
                    <div className="profile-link">
                        <button onClick={viewPosts}>View Posts</button>
                    </div>
                    <div className="profile-link">
                        <button onClick={uploadPost}>New Post</button>
                    </div>
                    <div className="profile-link">
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>

            <div className="viewposts-container">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Post
                            key={post._id}
                            user={post.userId}
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
        </>
    );
}

export default ViewProfile;
