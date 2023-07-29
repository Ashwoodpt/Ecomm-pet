import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ProductsProvider } from './context/products_context.tsx';
import { FilterProvider } from './context/filter_context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ProductsProvider>
			<FilterProvider>
				<App />
			</FilterProvider>
		</ProductsProvider>
	</React.StrictMode>
);
