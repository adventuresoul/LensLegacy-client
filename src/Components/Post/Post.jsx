import './Post.css';

function Post(props) {
    return (
        <article className="post">
            <img src={props.imageLink} alt={props.title} className="post__image" />
            <div className="post__content">
                <h1 className="post__title">{props.title}</h1>
                <p className="post__text">{props.description}</p>
                <p className="post__text">category - {props.category}</p>
            </div>
        </article>
    );
}

export default Post;
