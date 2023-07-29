import { SIDEBAR_OPEN, SIDEBAR_CLOSE, GET_PRODUCTS_BEGIN, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, GET_SINGLE_PRODUCT_BEGIN, GET_SINGLE_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_ERROR } from '../actions';

import { ProductType } from '../utils/types';

const products_reducer = (state: { isSidebarOpen: boolean }, action: { payload?: ProductType[]; type: String }) => {
	if (action.type === SIDEBAR_OPEN) {
		return { ...state, isSidebarOpen: true };
	}
	if (action.type === SIDEBAR_CLOSE) {
		return { ...state, isSidebarOpen: false };
	}

	if (action.type === GET_PRODUCTS_BEGIN) {
		return { ...state, areProductsLoading: true };
	}
	if (action.type === GET_PRODUCTS_SUCCESS) {
		const featured_products = action.payload?.filter((product) => product.featured === true);
		return { ...state, areProductsLoading: false, products: action.payload, featured_products: featured_products };
	}
	if (action.type === GET_PRODUCTS_ERROR) {
		return { ...state, areProductsLoading: false, areProductsError: true };
	}
	if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
		return { ...state, isSingleProductLoading: true };
	}
	if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
		return { ...state, isSingleProductLoading: false, single_product: action.payload };
	}
	if (action.type === GET_SINGLE_PRODUCT_ERROR) {
		return { ...state, isSingleProductLoading: false, isSingleProductError: true };
	}

	return state;
	throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
