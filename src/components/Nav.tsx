type PropsType ={
    viewCart:boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

function Nav({viewCart, setViewCart}:PropsType) {
    const button  = viewCart  ?<button className="bg-slate-700 p-1 px-3 rounded-md text-slate-100" onClick={()=>setViewCart(false)}>View Product</button>: <button className="bg-slate-700 text-slate-100 p-1 px-3 rounded-md" onClick={()=>setViewCart(true)}>
        View Cart
    </button>


    const content = (
        <nav className="flex justify-end items-start mx-1 my-2">{button}</nav>
    )
  return content
}

export default Nav