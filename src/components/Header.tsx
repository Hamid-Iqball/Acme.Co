import Nav from "./Nav"
type PropsType = {
    viewCart:boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

function Header({viewCart, setViewCart}:PropsType) {
  return (
<header className="border-b-2 mx-2 ">
 <div className="flex justify-between items-start p-3" >

        <h1 className="text-3xl font-normal">
            Acme Co.
        </h1>
        <div>
            <p>Total Items:</p>
            <p>Total Price:</p>
        </div>
 </div>
    <Nav viewCart={viewCart} setViewCart={setViewCart} />
</header>
  )
}

export default Header