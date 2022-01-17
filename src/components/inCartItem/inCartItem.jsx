import CloseIcon from '@mui/icons-material/Close';
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as actionCreators from "../../state/action-creators/index.js";
import { useSelector } from 'react-redux';
import { StyledCartNumberButton } from '../product-card/product-card.jsx';
import { useState, useEffect } from 'react';
import styled from "styled-components"

const StyledItemCard = styled.div`
    position: relative;
    width: 80%;
    height: 150px;
    -webkit-box-shadow: 0px 6px 11px -2px rgba(0,0,0,0.46); 
    box-shadow: 0px 6px 11px -2px rgba(0,0,0,0.46);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem;

    @media (max-width:630px){
        &{
            flex-direction: column;
            height: 200px;
        }
    }
`

const StyledItemCardPrice = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
`

export default function InCartItem(props) {

    const [actualCartProduct, setActualCartProduct] = useState({})
    const dispatch = useDispatch();
    const { addToCart, removeFromCart, removeAllFromCart } = bindActionCreators(actionCreators, dispatch);
    const cartAmount = useSelector((state) => state.account);

    useEffect(() => {
        const filtered = cartAmount?.find(e => e._id === props.data._id);
        setActualCartProduct(() => {
            return filtered
        });
    }, [cartAmount]);

    const onAddToCart = (e) => {
        addToCart(actualCartProduct)
    }

    const onRemoveFromCart = () => {
        removeFromCart(actualCartProduct)
    }

    const onRemoveAll = () => {
        removeAllFromCart(props.data)
    }


    return (
        <StyledItemCard>
            <div>
                <h2>{props.data.title}</h2>
                <p style={{opacity:".7"}}>{props.data.description}</p>
                <p>{props.data.price.toFixed(2)}€</p>
            </div>
            <div>
                <StyledItemCardPrice>
                    <span style={{cursor:"pointer"}} onClick={onRemoveAll}><CloseIcon /></span>
                </StyledItemCardPrice>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                        <StyledCartNumberButton onClick={onRemoveFromCart}>-</StyledCartNumberButton>
                        <p>{actualCartProduct?.account ?? 0}</p>
                        <StyledCartNumberButton onClick={onAddToCart}>+</StyledCartNumberButton>
                    </div>
                </div>
            </div>
        </StyledItemCard>
    )
}