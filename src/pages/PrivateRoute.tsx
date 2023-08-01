import { useAuth0 } from '@auth0/auth0-react';
import { Loading } from '../components';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const { user, loginWithRedirect, isLoading, error } = useAuth0();
	if (isLoading) {
		return (
			<section className="page-100">
				<Loading />
			</section>
		);
	} else if (error) {
		return (
			<section className="page-100">
				<h1>{error.message}</h1>
			</section>
		);
	}
	return user ? (
		<>{children}</>
	) : (
		<div className="page-100" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
			<h1>Access denied</h1>
			<p>You need to log in to see the contents of the page</p>
			<button type="button" className="btn" onClick={() => loginWithRedirect({ authorizationParams: { redirect_uri: window.location.href } })}>
				Login
			</button>
		</div>
	);
};
export default PrivateRoute;
