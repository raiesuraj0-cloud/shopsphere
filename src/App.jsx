import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { CartProvider, useCart } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import NotFound from './pages/NotFound'
import InfoPage from './pages/InfoPage'
import Account from './pages/Account'

function ScrollToTop(){const {pathname,search}=useLocation(); useEffect(() => { window.scrollTo(0, 0) }, [pathname,search]); return null}
function Toast(){const {toast}=useCart(); return toast?<div className="toast" role="status">{toast}</div>:null}
export default function App(){return <BrowserRouter><CartProvider><WishlistProvider><ScrollToTop/><Navbar/><Routes><Route path="/" element={<Home/>}/><Route path="/products" element={<Products/>}/><Route path="/product/:id" element={<ProductDetails/>}/><Route path="/cart" element={<Cart/>}/><Route path="/wishlist" element={<Wishlist/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/order-success" element={<OrderSuccess/>}/><Route path="/account" element={<Account/>}/><Route path="/info/:slug" element={<InfoPage/>}/><Route path="*" element={<NotFound/>}/></Routes><Footer/><Toast/></WishlistProvider></CartProvider></BrowserRouter>}
