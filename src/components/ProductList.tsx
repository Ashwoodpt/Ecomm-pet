import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';
import { useProductsContext } from '../context/products_context';
import { Loading } from '.';
import { FilterContextType, ProductContextType } from '../utils/types';

const ProductList = () => {
	const { filtered_products: products, view_layout } = useFilterContext() as FilterContextType;
	const { areProductsLoading } = useProductsContext() as ProductContextType;

	if (areProductsLoading) return <Loading />;

	if (!products.length) return <h5 style={{ textTransform: 'none' }}>Sorry, no products match your search</h5>;

	if (view_layout === 'list') return <ListView products={products} />;

	return <GridView products={products} />;
};

export default ProductList;
