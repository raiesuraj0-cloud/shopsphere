import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
export default function Navbar() {
  const {count} = useCart(); const {wishlist}=useWishlist(); const [open,setOpen]=useState(false); const [query,setQuery]=useState(''); const navigate=useNavigate()
  const submit=(e)=>{e.preventDefault(); navigate(`/products?q=${encodeURIComponent(query.trim())}`)}
  return <>
    <div style={{background:'#173f2d',color:'#fff',fontSize:13,textAlign:'center',padding:'8px'}}>Free delivery on orders over $100 · Easy 30-day returns</div>
    <header style={{borderBottom:'1px solid #edf0ee',background:'rgba(255,255,255,.96)',position:'sticky',top:0,zIndex:50}}>
      <div className="container" style={{height:78,display:'flex',alignItems:'center',gap:24}}>
        <Link to="/" aria-label="ShopSphere home" style={{textDecoration:'none',color:'#173f2d',display:'flex',alignItems:'center',gap:9}}><img src="/logo.svg" alt="" style={{width:42,height:42}}/><span style={{fontSize:24,fontWeight:900,letterSpacing:'-.8px'}}>Shop<span style={{color:'#d68a3a'}}>Sphere</span></span></Link>
        <nav className="desktop-nav" style={{display:'flex',gap:22,marginLeft:20}}><NavLink to="/" className="navlink">Home</NavLink><NavLink to="/products" className="navlink">Shop</NavLink><NavLink to="/products?section=new" className="navlink">New arrivals</NavLink><NavLink to="/products?category=Accessories" className="navlink">Collections</NavLink></nav>
        <form onSubmit={submit} style={{marginLeft:'auto',position:'relative',width:'min(300px,28vw)'}}><input className="input" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products" aria-label="Search products" style={{paddingLeft:42,height:42}}/><Search size={18} style={{position:'absolute',left:14,top:12,color:'#78857e'}}/></form>
        <div style={{display:'flex',gap:6}}><button className="icon-btn" aria-label="Account" onClick={()=>navigate('/account')}><User size={19}/></button><Link className="icon-btn" aria-label="Wishlist" to="/wishlist"><Heart size={19}/>{wishlist.length>0&&<span style={{position:'absolute',margin:'-42px 0 0 32px',background:'#d68a3a',color:'#fff',borderRadius:20,fontSize:10,padding:'2px 5px'}}>{wishlist.length}</span>}</Link><Link className="icon-btn" aria-label="Cart" to="/cart"><ShoppingBag size={19}/>{count>0&&<span style={{position:'absolute',margin:'-42px 0 0 32px',background:'#173f2d',color:'#fff',borderRadius:20,fontSize:10,padding:'2px 5px'}}>{count}</span>}</Link><button className="icon-btn mobile-menu" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X size={20}/>:<Menu size={20}/>}</button></div>
      </div>
      {open&&<div className="mobile-panel"><Link to="/">Home</Link><Link to="/products">Shop</Link><Link to="/products?section=new">New arrivals</Link><Link to="/products?section=best">Best sellers</Link><Link to="/products?section=sale">Sale</Link><Link to="/wishlist">Wishlist</Link><Link to="/cart">Cart</Link></div>}
    </header>
    <style>{`.navlink{text-decoration:none;color:#3d4942;font-size:14px;font-weight:700}.navlink.active{color:#173f2d}.mobile-menu{display:none}.mobile-panel{display:none}@media(max-width:900px){.desktop-nav{display:none!important}.mobile-menu{display:grid!important}.mobile-panel{display:grid;padding:12px 20px 18px;border-top:1px solid #edf0ee}.mobile-panel a{padding:10px;text-decoration:none;color:#173f2d;font-weight:700}}@media(max-width:640px){header form{display:none}}`}</style>
  </>
}