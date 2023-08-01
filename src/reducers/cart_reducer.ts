import { ADD_TO_CART, CLEAR_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT } from '../actions';
import { CartContextType, CartItemType, CartPayloadType } from '../utils/types';

const cart_reducer = (state: CartContextType, action: { payload?: CartPayloadType | { id: string; value?: number }; type: String }) => {
	if (action.type === ADD_TO_CART) {
		const { id, color, amount, product } = action.payload as CartPayloadType;
		const tempItem = state.cart.find((cartItem) => cartItem.id === id + color);
		if (tempItem) {
			const tempCart = state.cart.map((cartItem) => {
				if (cartItem.id === id + color) {
					let newAmount = cartItem.amount + amount;
					if (newAmount > cartItem.max) newAmount = cartItem.max;
					return { ...cartItem, amount: newAmount };
				}
				return cartItem;
			});
			return { ...state, cart: tempCart };
		} else {
			const newItem: CartItemType = { id: id + color, name: product.name, color, amount, image: product.images[0].url, price: product.price, max: product.stock };
			return { ...state, cart: [...state.cart, newItem] };
		}
	}

	if (action.type === REMOVE_CART_ITEM) {
		return { ...state, cart: state.cart.filter((item) => item.id !== action.payload.id) };
	}
	if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
		const { id, value } = action.payload as { id: string; value?: number };
		const tempCart = state.cart.map((item) => {
			if (item.id === id) {
				const { amount, max } = item;
				if (amount + value > max) return { ...item, amount: max };
				if (amount + value < 1) return { ...item, amount: 1 };
				return { ...item, amount: amount + value };
			}
		});

		return { ...state, cart: tempCart };
	}
	if (action.type === CLEAR_CART) {
		return { ...state, cart: [] };
	}

	if (action.type === COUNT_CART_TOTALS) {
		const { total_items, total_amount } = state.cart.reduce(
			(current, cartItem) => {
				const { price, amount } = cartItem;
				current.total_items += amount;
				current.total_amount += amount * price;

				return current;
			},
			{ total_items: 0, total_amount: 0 }
		);
		return { ...state, total_items, total_amount };
	}
	return state;
	throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
