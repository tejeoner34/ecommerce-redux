import { useSelector } from "react-redux"

export default function CartPage(){

    const cart = useSelector((state)=>state.account);

    return(
        <h1>Cart page</h1>
    )
}