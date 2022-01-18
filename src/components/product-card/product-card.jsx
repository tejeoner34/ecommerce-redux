import { StyledCard } from "../../styled-components/styled-card"
import styled from "styled-components"
import { useState } from "react"
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as actionCreators from "../../state/action-creators/index.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const StyledButton = styled.button`
    background-color: rgb(45 55 58);
    color: white;
    border: none;
    border-bottom: 1px solid blue;
    width: 80%;
    padding: .5rem;
    border-radius: 7px;
    cursor: pointer;
    transition: .5s ease-in-out;

    &:hover{
        background-color: #06a6d6 ;
    }
    
`
export const StyledCartNumberButton = styled.button`
    width: 30px;
    height: 30px;
    cursor: pointer;
`

export default function ProductCard(props) {


    const [actualCartProduct, setActualCartProduct] = useState({})
    const cartAmount = useSelector((state) => state.account);
    const [isInCart, updateIsInCart] = useState(actualCartProduct?.account > 0);


    useEffect(() => {
        const filtered = cartAmount?.find(e => e._id === props.data._id);
        setActualCartProduct(()=>{
            updateIsInCart(filtered?.account > 0)
            return filtered
        });

    },[cartAmount, props.data._id]);

    
    const dispatch = useDispatch();
    const { addToCart, removeFromCart } = bindActionCreators(actionCreators, dispatch);


    const onAddToCart = (e) => {
        addToCart(props.data);
        updateIsInCart(true)
    }

    const onRemoveFromCart = (e) => {
        removeFromCart(props.data);
        if (actualCartProduct.account < 1) {
            updateIsInCart(false)
        }
    }


    return (
        <StyledCard>
            <div>
                <h4>{props.data.title}</h4>
            </div>
            <div style={{ height: '80px', overflow: 'auto' }}>
                <p>{props.data.description}</p>
            </div>
            <div>
                <p>{props.data.price.toFixed(2)}€</p>
            </div>
            {
                isInCart ?
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                        <StyledCartNumberButton onClick={onRemoveFromCart}>-</StyledCartNumberButton>
                        <p>{actualCartProduct?.account ?? 0}</p>
                        <StyledCartNumberButton onClick={onAddToCart}>+</StyledCartNumberButton>
                    </div>
                    :
                    <StyledButton onClick={onAddToCart}>Add to cart</StyledButton>
            }
        </StyledCard>
    )
}