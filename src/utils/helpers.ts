import { ProductType } from './types';
export const formatPrice = (price: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(price / 100);
};

export const getUniqueValues = (data: ProductType[], name: string) => {
	let unique = data.map((item) => item[name]);
	if (typeof unique[1] === typeof []) unique = unique.flat();
	return ['all', ...new Set(unique)];
};
