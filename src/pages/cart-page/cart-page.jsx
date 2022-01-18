import { useEffect, useState } from "react";
import { serverUrl } from "../../global-variable/global-variable";
import { useSelector } from "react-redux"
import styled from "styled-components"
import InCartItem from "../../components/inCartItem/inCartItem";
import ProductCard from "../../components/product-card/product-card";

const StyledCartItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 90%;
    margin-bottom: 2rem;
`
const StyledCartPage = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const StyledRecommenededContainer = styled.div`
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
    justify-content: center;
`

export default function CartPage() {

    const cart = useSelector((state) => state.account);
    const [recommendedProducts, setRecommendedProducts] = useState(null)

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        fetch(`${serverUrl}products/`)
            .then(r => r.json())
            .then(d => {
                const firstIndex = getRandomInt(d.length - 5)
                setRecommendedProducts(() => {
                    return d.slice(firstIndex, firstIndex + 4)
                })

            })
    }, [])



    return (
        <StyledCartPage>
            <h1>Cart page</h1>
            <StyledCartItemsContainer>
                {
                    cart.length > 0 ?
                        cart?.map((e, i) => <InCartItem data={e} key={i}></InCartItem>)
                        :
                        <h2>No items in your shopping cart</h2>
                }
            </StyledCartItemsContainer>
            <h2>Other products you may like</h2>
            <StyledRecommenededContainer>
                {
                    recommendedProducts && recommendedProducts.map((e, i) => <ProductCard key={i} data={e}></ProductCard>)
                }
            </StyledRecommenededContainer>
        </StyledCartPage>
    )
}