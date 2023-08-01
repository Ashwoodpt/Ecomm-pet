import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ProductsProvider } from './context/products_context.tsx';
import { FilterProvider } from './context/filter_context.tsx';
import { CartProvider } from './context/cart_context.tsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserProvider } from './context/user_context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Auth0Provider domain={import.meta.env.VITE_AUTH_DOMAIN} clientId={import.meta.env.VITE_AUTH_CLIENT} authorizationParams={{ redirect_uri: window.location.origin }} cacheLocation="localstorage">
			<UserProvider>
				<ProductsProvider>
					<FilterProvider>
						<CartProvider>
							<App />
						</CartProvider>
					</FilterProvider>
				</ProductsProvider>
			</UserProvider>
		</Auth0Provider>
	</React.StrictMode>
);
