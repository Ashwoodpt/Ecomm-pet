import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/products_reducer';
import { products_url as url } from '../utils/constants';
import { SIDEBAR_OPEN, SIDEBAR_CLOSE, GET_PRODUCTS_BEGIN, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, GET_SINGLE_PRODUCT_BEGIN, GET_SINGLE_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_ERROR } from '../actions';
import { ProductContextType } from '../utils/types';

const initialState: ProductContextType = {
	isSidebarOpen: false,
	areProductsLoading: false,
	areProductsError: false,
	isSingleProductLoading: false,
	isSingleProductError: false,
	products: [],
	featured_products: [],
	single_product: {},
};

const ProductsContext = React.createContext<ProductContextType | {}>({});

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const openSidebar = () => {
		dispatch({ type: SIDEBAR_OPEN });
	};

	const closeSidebar = () => {
		dispatch({ type: SIDEBAR_CLOSE });
	};

	const fetchProducts = async () => {
		dispatch({ type: GET_PRODUCTS_BEGIN });
		try {
			const response = await axios(url);
			const products = response.data;
			dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
		} catch (error) {
			dispatch({ type: GET_PRODUCTS_ERROR });
		}
	};

	const fetchSingleProduct = async (url) => {
		dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
		try {
			const response = await axios(url);
			const products = response.data;
			dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: products });
		} catch (error) {
			dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return <ProductsContext.Provider value={{ fetchSingleProduct, openSidebar, closeSidebar, ...state }}>{children}</ProductsContext.Provider>;
};
// make sure use
export const useProductsContext = () => {
	return useContext(ProductsContext);
};
