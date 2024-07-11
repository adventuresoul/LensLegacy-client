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
    profilePhotoUrl: '',
    instagramUsername: ''
  });

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
      getProfile(storedToken); 
    } else {
      navigate('/login');
    }
  }, []);

  const getProfile = async (token) => {
    try {
      const response = await axios.get('http://127.0.0.1:9000/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserProfile({
        username: response.data.username,
        email: response.data.email,
        phone: response.data.phone,
        profilePhotoUrl: response.data.profilePhotoUrl,
        instagramUsername: response.data.instagramUsername
      });
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      alert('Error fetching profile. Please try again later.');
    }
  };

  const logout = () => {
    setToken(null);
    Cookies.remove('token', { path: '/' });
    navigate('/login');
  };

  const uploadPost = () => {
    navigate('/newPost');
  };

  const viewPosts = () => {
    navigate('/myPosts');
  };

  const deleteMe = async () => {
    try {
      await axios.delete('http://127.0.0.1:9000/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/signup');
    } catch (error) {
      console.error('Error deleting profile:', error.message);
      alert('Error deleting profile. Please try again later.');
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-photo">
        <img src={userProfile.profilePhotoUrl} alt="Profile" />
      </div>
      <div className="profile-info">
        <h1>{userProfile.username}</h1>
        <p>{userProfile.email}</p>
        <p>Contact: {userProfile.phone}</p>
        <p>Instagram: {userProfile.instagramUsername}</p>
      </div>
      <div className="profile-links">
        <div className="profile-link">
          <button onClick={viewPosts}>My Posts</button>
        </div>
        <div className="profile-link">
          <button onClick={uploadPost}>New Post</button>
        </div>
        <div className="profile-link">
          <button onClick={logout}>Logout</button>
        </div>
        <div className="profile-link">
          <button onClick={deleteMe}>Delete Profile</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
