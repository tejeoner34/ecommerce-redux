import { useSelector } from "react-redux"
import styled from "styled-components"
import InCartItem from "../../components/inCartItem/inCartItem";

const StyledCartItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 90%;
`
const StyledCartPage = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export default function CartPage(){

    const cart = useSelector((state)=>state.account);
    console.log(cart)

    return(
        <StyledCartPage>
        <h1>Cart page</h1>
        <StyledCartItemsContainer>
            {
                cart.length>0?
                cart?.map((e,i)=><InCartItem data={e} key={i}></InCartItem>)
                :
                <h2>No items in your shopping cart</h2>
            }
        </StyledCartItemsContainer>

        </StyledCartPage>
    )
}