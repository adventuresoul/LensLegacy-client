import './Post.css';
import { useNavigate } from 'react-router-dom';

function Post(props) {
    const navigate = useNavigate();

    const userId = props.user;

    // function to go to specific profile
    const viewProfile = () => {
        navigate(`/viewProfile/${userId}`);
    }
    console.log(props.user);
    return (
        <article className="post">
            <img src={props.imageLink} alt={props.title} className="post__image" />
            <div className="post__content">
                <h1 className="post__title">{props.title}</h1>
                <p className="post__text">{props.description}</p>
                <p className="post__text">category - {props.category}</p>
            </div>
            <div>
                <button onClick={viewProfile}>View Profile</button>
            </div>
        </article>
    );
}

export default Post;
