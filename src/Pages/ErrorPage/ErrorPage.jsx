import { Link } from 'react-router-dom';


function ErrorPage() {
    return (
        <div className='error-page-container'>
            <h1>Oops! Something went wrong.</h1>
            <h3>Sorry, the page you are looking for does not exist or an error occurred.</h3>
            <Link to="/" className='home-link'>Go back to Home</Link>
        </div>
    );
}

export default ErrorPage;
