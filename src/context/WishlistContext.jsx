import { createContext, useContext, useEffect, useState } from 'react'
const WishlistContext = createContext()
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('shopsphere-wishlist')) || [])
  useEffect(() => { localStorage.setItem('shopsphere-wishlist', JSON.stringify(wishlist)) }, [wishlist])
  const toggleWishlist = (product) => setWishlist(prev => prev.some(x => x.id === product.id) ? prev.filter(x => x.id !== product.id) : [...prev, product])
  const removeFromWishlist = (id) => setWishlist(prev => prev.filter(x => x.id !== id))
  return <WishlistContext.Provider value={{wishlist, toggleWishlist, removeFromWishlist}}>{children}</WishlistContext.Provider>
}
export const useWishlist = () => useContext(WishlistContext)