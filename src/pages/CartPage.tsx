import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import { CartContent, PageHero } from '../components';
import { CartContextType } from '../utils/types';

const CartPage = () => {
	const { cart } = useCartContext() as CartContextType;
	if (cart.length < 1) {
		return (
			<Wrapper className="page-100">
				<div className="empty">
					<h2>Your Cart is empty</h2>
					<Link className="btn" to="/products">
						Fill it
					</Link>
				</div>
			</Wrapper>
		);
	}
	return (
		<main>
			<PageHero title="cart" />
			<Wrapper className="page">
				<CartContent />
			</Wrapper>
		</main>
	);
};

const Wrapper = styled.main`
	.empty {
		text-align: center;
		h2 {
			margin-bottom: 1rem;
			text-transform: none;
		}
	}
`;

export default CartPage;
