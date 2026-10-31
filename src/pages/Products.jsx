import { Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/products'

export default function Products(){
 const [params,setParams]=useSearchParams()
 const section=params.get('section')
 const [category,setCategory]=useState(params.get('category')||'All')
 const [query,setQuery]=useState(params.get('q')||'')
 const [sort,setSort]=useState(section==='best'?'popular':'featured')
 const [maxPrice,setMaxPrice]=useState(750)

 useEffect(() => {
   setCategory(params.get('category')||'All')
   setQuery(params.get('q')||'')
   const nextSection=params.get('section')
   setSort(nextSection==='best'?'popular':'featured')
 }, [params.toString()])

 const filtered=useMemo(()=>{
   let list=products.filter(p=>(category==='All'||p.category===category)&&p.price<=maxPrice&&(`${p.name} ${p.category} ${p.description}`).toLowerCase().includes(query.toLowerCase()))
   if(section==='sale') list=list.filter(p=>p.originalPrice)
   if(section==='new') list=[...list].sort((a,b)=>b.id-a.id)
   if(sort==='popular'||section==='best') list=[...list].sort((a,b)=>b.popularity-a.popularity)
   if(sort==='low') list=[...list].sort((a,b)=>a.price-b.price)
   if(sort==='high') list=[...list].sort((a,b)=>b.price-a.price)
   return list
 },[category,query,sort,maxPrice,section])

 const chooseCategory=(value)=>{
   setCategory(value)
   const next=new URLSearchParams(params)
   if(value==='All') next.delete('category'); else next.set('category',value)
   setParams(next)
 }
 const titles={new:['NEW ARRIVALS','Fresh finds just in'],best:['BEST SELLERS','Loved by our community'],sale:['SPECIAL OFFERS','Exceptional prices for limited selections']}
 const title=titles[section]||['SHOP ALL','Find your next favorite']

 return <main className="container" style={{paddingTop:40}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'end'}}><div><p style={{color:'#d68a3a',fontWeight:800}}>{title[0]}</p><h1 style={{fontSize:44,margin:'5px 0'}}>{title[1]}</h1></div><span style={{color:'#879087'}}>{filtered.length} products</span></div>
 <div style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:28,marginTop:32}}><aside><div style={{position:'sticky',top:100}}><div style={{display:'flex',alignItems:'center',gap:8,marginBottom:18}}><SlidersHorizontal size={18}/><b>Filters</b></div><label style={{fontWeight:800,fontSize:14}}>Category</label><div style={{display:'grid',gap:7,margin:'12px 0 24px'}}>{categories.map(c=> <button key={c} onClick={()=>chooseCategory(c)} className="btn" style={{justifyContent:'flex-start',background:c===category?'#173f2d':'#fff',color:c===category?'#fff':'#4e5b53',border:'1px solid #e5eae7',borderRadius:9}}>{c}</button>)}</div><label style={{fontWeight:800,fontSize:14}}>Price up to <b>${maxPrice}</b></label><input type="range" min="30" max="750" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))} style={{width:'100%',accentColor:'#173f2d',marginTop:12}}/></div></aside>
 <section><div style={{display:'flex',gap:12,marginBottom:18}}><div style={{position:'relative',flex:1}}><Search size={17} style={{position:'absolute',left:14,top:13,color:'#879087'}}/><input className="input" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search this collection" style={{paddingLeft:40}}/></div><select className="input" value={sort} onChange={e=>setSort(e.target.value)} style={{width:180}}><option value="featured">Featured</option><option value="popular">Most popular</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div>{filtered.length?<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>{filtered.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="card" style={{padding:60,textAlign:'center'}}><h2>No products found</h2><p style={{color:'#879087'}}>Try another category or search term.</p></div>}</section></div>
 <style>{`@media(max-width:800px){main>div[style*="grid-template-columns:220px"]{grid-template-columns:1fr!important}aside>div{position:static!important}aside div[style*="display: grid"]{grid-template-columns:repeat(2,1fr)!important}main section>div[style*="grid-template-columns:repeat(3"]{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:500px){main section>div[style*="grid-template-columns:repeat(3"]{grid-template-columns:1fr!important}}`}</style></main>
}