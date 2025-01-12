import './App.css';
import LoginPage from './components/Auth/Login';
import SignInPage from './components/Auth/Signin';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import YourAccount from './pages/YourAccount';
import CartPage from './pages/CartPage';
import ContactUs from './pages/ContactUs';
import OrderPage from './pages/OrderPage';
import AddressPage from './pages/AddressPage';
import AddPaymentMethods from './components/Payment/Payment';
import AdminPage from './pages/AdminPage';
import AddProduct from './components/Admin/AddProduct';
import ProductDetailPage from './components/Products/ProductDetail';
import { CartProvider } from './components/CartContext';
import { Routes, Route, Router } from 'react-router-dom';
import SeeOrders from './components/Admin/SeeOrders';
import CheckoutPage from './pages/CheckoutPage';


function App() {
  return (
    <div>
      <CartProvider>
        <Routes>
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/seeorders" element={<SeeOrders />} />
          <Route path='/' element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/youracc" element={<YourAccount />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/youraddress" element={<AddressPage />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/products" element={<ProductPage />} />      
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
