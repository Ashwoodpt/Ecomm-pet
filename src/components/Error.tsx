import { Link } from 'react-router-dom';
const Error = () => {
	return (
		<div className="section section-center text-center">
			<h2>There was an error...</h2>
			<Link to="/" className="btn">
				Back Home
			</Link>
		</div>
	);
};

export default Error;
