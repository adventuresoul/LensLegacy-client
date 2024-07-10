import './ProfilePage.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    phone: '',
    profilePhotoUrl: ''
  });

  // useEffect hook to get token after page is mounted
  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
      getProfile(storedToken); 
    } else {
      navigate('/login');
    }
  }, []); // Empty dependency array ensures this effect runs once on mount


  // function to fetch present user info
  const getProfile = async (token) => {
    try {
      const response = await axios.get('http://127.0.0.1:9000/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserProfile({
        username: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        profilePhotoUrl: response.data.profilePhotoUrl
      });
    } 
    catch (error) {
      console.error('Error: ' + error.message);
      alert('Please try again later.');
    }
  };

  // function to logout
  const logout = () => {
    setToken(null);
    Cookies.remove('token', { path: '/' });
    navigate('/login');
  };


  // function to naviaget to new post upload page
  const uploadPost = () => {
    navigate('/newPost');
  };

  // function to navigate to myPosts page
  const viewPosts = () => {
    navigate('/myPosts');
  }

  // conditional rendering based on token var 
  if (!token) {
    return null; // Render nothing if no token is present
  }
  else{
    return (
      <div className="profile-container">
        <div className="profile-photo">
          <img src={userProfile.profilePhotoUrl} alt="Profile" />
        </div>
        <div className="profile-info">
          <h1>{userProfile.username}</h1>
          <p>{userProfile.email}</p>
          <p>contact:{userProfile.phone}</p>
          <p>Instagram:{userProfile.instagramUsername}</p>
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
    );
  }
}

export default ProfilePage;
