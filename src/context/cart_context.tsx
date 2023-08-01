import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import { ADD_TO_CART, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT, CLEAR_CART, COUNT_CART_TOTALS } from '../actions';
import { CartContextType, CartItemType, singleProductType } from '../utils/types';

const getLocalStorage = () => {
	let cart = localStorage.getItem('cart');
	if (cart) return JSON.parse(cart) as CartItemType[];
	return [];
};

const initialState: CartContextType = {
	cart: getLocalStorage(),
	total_items: 0,
	total_amount: 0,
	shipping_fee: 534,
};

const CartContext = React.createContext<CartContextType | {}>({});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const addToCart = (id: string, color: string, amount: number, product: singleProductType) => {
		dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
	};
	const removeItem = (id: string) => {
		dispatch({ type: REMOVE_CART_ITEM, payload: { id } });
	};
	const toggleAmount = (id: string, value: number) => {
		dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
	};

	const clearCart = () => {
		dispatch({ type: CLEAR_CART });
	};

	useEffect(() => {
		dispatch({ type: COUNT_CART_TOTALS });
		localStorage.setItem('cart', JSON.stringify(state.cart));
	}, [state.cart]);
	return <CartContext.Provider value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}>{children}</CartContext.Provider>;
};
// make sure use
export const useCartContext = () => {
	return useContext(CartContext);
};
