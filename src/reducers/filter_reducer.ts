import { LOAD_PRODUCTS, SET_LISTVIEW, SET_GRIDVIEW, UPDATE_SORT, SORT_PRODUCTS, UPDATE_FILTERS, FILTER_PRODUCTS, CLEAR_FILTERS } from '../actions';
import { ChangeFilterType, FilterActionType, FilterContextType, ProductType } from '../utils/types';

const filter_reducer = (state: FilterContextType, action: FilterActionType) => {
	if (action.type === LOAD_PRODUCTS) {
		let maxPrice = Math.max(...(action.payload as ProductType[]).map((product) => product.price));
		return {
			...state,
			all_products: [...(action.payload as ProductType[])],
			filtered_products: [...(action.payload as ProductType[])],
			filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
		};
	}

	if (action.type === SET_LISTVIEW) {
		return { ...state, view_layout: 'list' };
	}
	if (action.type === SET_GRIDVIEW) {
		return { ...state, view_layout: 'grid' };
	}

	if (action.type === UPDATE_SORT) {
		return { ...state, sort: action.payload };
	}
	if (action.type === SORT_PRODUCTS) {
		const { sort, filtered_products } = state;
		let tempProducts = [...filtered_products];
		if (sort === 'price-lowest') {
			tempProducts = tempProducts.sort((prev, next) => prev.price - next.price);
		}
		if (sort === 'price-highest') {
			tempProducts = tempProducts.sort((prev, next) => next.price - prev.price);
		}
		if (sort === 'name-a') {
			tempProducts = tempProducts.sort((prev, next) => (prev.name < next.name ? -1 : 1));
		}
		if (sort === 'name-z') {
			tempProducts = tempProducts.sort((prev, next) => (next.name < prev.name ? -1 : 1));
		}
		return { ...state, filtered_products: tempProducts };
	}

	if (action.type === UPDATE_FILTERS) {
		const { name, value } = action.payload as ChangeFilterType;
		if (name === 'company') {
			let newState = {};

			if (state.filters.company.includes(value as string)) {
				newState = { ...state, filters: { ...state.filters, company: state.filters.company.filter((company) => company !== value) } };
			} else newState = { ...state, filters: { ...state.filters, company: [...state.filters.company, value] } };
			return newState;
		}
	}
	if (action.type === FILTER_PRODUCTS) {
	}
	return state;
	throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
