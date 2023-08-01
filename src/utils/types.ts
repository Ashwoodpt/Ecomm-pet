export type ProductContextType = {
	isSidebarOpen: boolean;
	areProductsLoading: boolean;
	areProductsError: boolean;
	isSingleProductLoading: boolean;
	isSingleProductError: boolean;
	products: ProductType[];
	featured_products: ProductType[];
	single_product: singleProductType | {};
	openSidebar?: () => void;
	closeSidebar?: () => void;
	fetchSingleProduct?: (url: string) => Promise<void>;
};

export type ProductType = {
	id: string;
	name: string;
	price: number;
	image: string;
	colors: string[];
	company: string;
	description: string;
	category: string;
	shipping: boolean;
	featured?: boolean;
};

export type singleProductType = {
	id: string;
	stock: number;
	price: number;
	shipping: boolean;
	colors: string[];
	category: string;
	images: imageType[];
	reviews: number;
	stars: number;
	name: string;
	description: string;
	company: string;
};

export type imageType = {
	id?: string;
	width?: number;
	height?: number;
	url: string;
	filename?: string;
	size?: number;
	type?: string;
	thumbnails?: { small: { url: string; width: number; height: number }; large: { url: string; width: number; height: number }; full: { url: string; width: number; height: number } };
};

export type FilterSortType = 'price-lowest' | 'price-highest' | 'name-a' | 'name-z';

export type FilterType = {
	text: string;
	company: Array<string>;
	category: string;
	color: string;
	min_price: number;
	max_price: number;
	price: number;
	shipping: boolean;
};

export type FilterActionType = {
	type: string;
	payload?: FilterPayloadType;
};

export type ChangeFilterType = { name: string; value: string } | { name: string; value: number } | { name: string; value: boolean };

export type FilterPayloadType = FilterSortType | ProductType[] | ChangeFilterType;

export type FilterContextType = {
	filtered_products: ProductType[];
	all_products: ProductType[];
	view_layout: 'grid' | 'list';
	sort: FilterSortType;
	filters: FilterType;
	setGridView?: () => void;
	setListView?: () => void;
	updateSort?: (e) => void;
	updateFilters?: () => void;
	clearFilters?: () => void;
};

export type CartContextType = {
	cart: CartItemType[];
	total_items: number;
	total_amount: number;
	shipping_fee: number;
	addToCart?: (id: string, color: string, amount: number, product: singleProductType) => void;
	removeItem?: (id: string) => void;
	toggleAmount?: (id: string, value) => void;
	clearCart?: () => void;
};

export type CartItemType = {
	id: string;
	name: string;
	color: string;
	image: string;
	amount: number;
	price: number;
	max: number;
};

export type CartPayloadType = {
	id: string;
	color: string;
	amount: number;
	product: singleProductType;
};
