import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';
import { FilterContextType } from '../utils/types';
import { useState } from 'react';

const Filters = () => {
	const {
		filters: { text, company: current_company, category: current_category, color, min_price, price, max_price, shipping },
		updateFilters,
		clearFilters,
		all_products,
	} = useFilterContext() as FilterContextType;

	const unique_categories = getUniqueValues(all_products, 'category');
	const unique_companies = getUniqueValues(all_products, 'company');
	const unique_colors = getUniqueValues(all_products, 'colors');

	return (
		<Wrapper>
			<div className="content">
				<form action="" onSubmit={(e) => e.preventDefault()}>
					<div className="form-control">
						<input type="text" name="text" id="text" placeholder="Search" className="search-input" value={text} onChange={updateFilters} />
					</div>
					{/* category start */}
					<div className="form-control">
						<h5>category</h5>
						<div>
							{unique_categories.map((category, index) => (
								<button key={index} name="category" type="button" className={category === current_category.toLowerCase() ? 'active' : null} onClick={updateFilters}>
									{category}
								</button>
							))}
						</div>
					</div>
					{/* company start */}
					<div className="form-control">
						<h5>Company</h5>
						<div className="company">
							{unique_companies.map((company, index) => {
								return (
									<div className="checkbox" key={index}>
										<input type="checkbox" name="company" id={company} checked={current_company.includes(company) || current_company.includes('all')} onChange={updateFilters}></input>
										<label htmlFor={company}>{company}</label>
									</div>
								);
							})}
						</div>
					</div>
					{/* colors start */}
					<div className="form-control">
						<h5>Colors</h5>
						<div className="colors">
							{unique_colors.map((c, index) => {
								if (c === 'all')
									return (
										<button key={index} name="color" className={`${color === 'all' ? 'all-btn active' : 'all-btn'}`} data-color="all" onClick={updateFilters}>
											All
										</button>
									);
								return (
									<button key={index} name="color" className={`${color === c ? 'color-btn active' : 'color-btn'}`} style={{ background: c }} data-color={c} onClick={updateFilters}>
										{color === c ? <FaCheck /> : null}
									</button>
								);
							})}
						</div>
					</div>
					{/* price start */}
					<div className="form-control">
						<h5>Price</h5>
						<p className="price">{formatPrice(price)}</p>
						<input type="range" name="price" id="price" onChange={updateFilters} min={min_price} max={max_price} value={price} />
					</div>
					{/* free shipping checkbox */}
					<div className="form-control shipping">
						<label htmlFor="shipping">Free shipping</label>
						<input type="checkbox" name="shipping" id="shipping" checked={shipping} onChange={updateFilters} />
					</div>
				</form>
				<button type="button" className="clear-btn" onClick={clearFilters}>
					Clear filters
				</button>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.form-control {
		margin-bottom: 1.25rem;
		h5 {
			margin-bottom: 0.5rem;
		}
	}
	.search-input {
		padding: 0.5rem;
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		letter-spacing: var(--spacing);
	}
	.search-input::placeholder {
		text-transform: capitalize;
	}

	button {
		display: block;
		margin: 0.25em 0;
		padding: 0.25rem 0;
		text-transform: capitalize;
		background: transparent;
		border: none;
		border-bottom: 1px solid transparent;
		letter-spacing: var(--spacing);
		color: var(--clr-grey-5);
		cursor: pointer;
	}
	.active {
		border-color: var(--clr-grey-5);
	}
	.company {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 2rem;
		.checkbox {
			display: flex;
			gap: 0.5rem;
			margin-bottom: 0.25rem;
			text-transform: capitalize;
			input {
				width: 25px;
				height: 25px;
			}
			input:checked {
				background-color: #000;
			}
		}
	}
	.colors {
		display: flex;
		align-items: center;
	}
	.color-btn {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: #222;
		margin-right: 0.5rem;
		border: none;
		cursor: pointer;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 0.5rem;
			color: var(--clr-white);
		}
	}
	.all-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 0.5rem;
		opacity: 0.5;
	}
	.active {
		opacity: 1;
	}
	.all-btn .active {
		text-decoration: underline;
	}
	.price {
		margin-bottom: 0.25rem;
	}
	.shipping {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		text-transform: capitalize;
		column-gap: 0.5rem;
		font-size: 1rem;
		max-width: 200px;
	}
	.clear-btn {
		background: var(--clr-red-dark);
		color: var(--clr-white);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius);
	}
	@media (min-width: 768px) {
		.content {
			position: sticky;
			top: 1rem;
		}
		.company {
			gap: 1rem;
		}
	}
`;

export default Filters;
