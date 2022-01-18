import './header.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"
import { useEffect } from 'react';
import { useState } from 'react';


export default function Header(){

    
    const cartAmount = useSelector((state)=>state.account);
    const [amount, setAmount] = useState(0);

    useEffect(()=>{
        let counter= 0;
        for(let i = 0; i<cartAmount.length; i++){
            counter += cartAmount[i].account
        };
        setAmount(counter)

    },[cartAmount])

    let history = useHistory()

    const handleCartClick = () => {
        history.push('/cart')
    }

    const handleToHome = ()=>{
        history.push('/')
    }



    return(
        <header className="header">
            <h1 style={{cursor:'pointer'}} onClick={handleToHome}>Ecommerce with Redux</h1>
            <Badge badgeContent={amount} color="primary">
            <ShoppingCartIcon sx={{cursor:'pointer'}} onClick={handleCartClick}></ShoppingCartIcon>
            </Badge>

        </header>
    )
}