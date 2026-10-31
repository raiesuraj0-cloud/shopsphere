import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('shopsphere-cart')) || [])
  const [toast, setToast] = useState('')
  useEffect(() => { localStorage.setItem('shopsphere-cart', JSON.stringify(cart)) }, [cart])
  const notify = (message) => { setToast(message); window.clearTimeout(window.__toastTimer); window.__toastTimer = window.setTimeout(() => setToast(''), 2200) }
  const addToCart = (product, quantity = 1) => { setCart(prev => { const found = prev.find(x => x.id === product.id); return found ? prev.map(x => x.id === product.id ? {...x, quantity: x.quantity + quantity} : x) : [...prev, {...product, quantity}] }); notify(`${product.name} added to cart`) }
  const updateQuantity = (id, quantity) => setCart(prev => prev.map(x => x.id === id ? {...x, quantity: Math.max(1, quantity)} : x))
  const removeFromCart = (id) => setCart(prev => prev.filter(x => x.id !== id))
  const clearCart = () => setCart([])
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return <CartContext.Provider value={{cart, count, subtotal, addToCart, updateQuantity, removeFromCart, clearCart, toast}}>{children}</CartContext.Provider>
}
export const useCart = () => useContext(CartContext)