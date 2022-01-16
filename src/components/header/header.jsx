import './header.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"


export default function Header(){

    const cartAmount = useSelector((state)=>state.account);
    console.log(cartAmount)

    let history = useHistory()

    const handleCartClick = () => {
        history.push('/cart')
    }



    return(
        <header className="header">
            <h1>Ecommerce with Redux</h1>
            <Badge badgeContent={cartAmount.length} color="primary">
            <ShoppingCartIcon sx={{cursor:'pointer'}} onClick={handleCartClick}></ShoppingCartIcon>
            </Badge>

        </header>
    )
}