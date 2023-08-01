import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContextType } from '../utils/types';

const UserContext = React.createContext<UserContextType | {}>({});
export const UserProvider = ({ children }) => {
	const { loginWithRedirect, logout, user } = useAuth0();
	const [myUser, setMyUser] = useState(null);

	useEffect(() => {
		setMyUser(user);
	}, [user]);
	return <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>{children}</UserContext.Provider>;
};
// make sure use
export const useUserContext = () => {
	return useContext(UserContext);
};
