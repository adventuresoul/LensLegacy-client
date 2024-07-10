import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import NewPost from './Pages/NewPost/NewPost';
import ViewPosts from './Pages/ViewPosts/ViewPosts';
import ViewProfile from './Pages/ViewProfile/ViewProfile'

function App() {
  return (
    <BrowserRouter>
      <Layout>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/profile' element={<ProfilePage />}></Route>
        <Route path='/newPost' element={<NewPost />}></Route>
        <Route path='/myPosts' element={<ViewPosts />}></Route>
        <Route path='/viewProfile/:id' element={<ViewProfile />}></Route>
        <Route path='*' element={<ErrorPage />}></Route>
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
