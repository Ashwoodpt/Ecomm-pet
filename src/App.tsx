import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, About, Cart, Checkout, Error, Private, Products, SingleProduct } from './pages';
import { Navbar, Sidebar, Footer } from './components';

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Sidebar />
				<Routes>
					<Route index element={<Home />} />

					<Route path="/about" element={<About />} />

					<Route path="/cart" element={<Cart />} />

					<Route
						path="/checkout"
						element={
							<Private>
								<Checkout />
							</Private>
						}
					/>

					<Route path="/products" element={<Products />} />

					<Route path="/products/:id" element={<SingleProduct />} />

					<Route path="*" element={<Error />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
