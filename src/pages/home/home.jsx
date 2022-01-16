import { useEffect } from "react";
import { serverUrl } from "../../global-variable/global-variable.js";
import { StyledAside } from "../../styled-components/index.js";
import { useState } from "react";
import styled from "styled-components";
import ProductCard from "../../components/product-card/product-card.jsx";

const StyledHome = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: space-between;
`
const StyledCardsContainer = styled.div`
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`
const StyledLi = styled.li`
    list-style: none;
    padding: 1rem;
    border-bottom: 1px solid darkgray;
    transition: .5s ease-in-out;
    cursor: pointer;

    &:hover{
        background-color: darkgray;
        border-radius: 10px;
    }

`

export default function Home() {

    

    const [products, setProducts] = useState([])
    const [originalProducts, setOriginalProducts] = useState([])


    useEffect(() => {
        fetch(`${serverUrl}products/`)
            .then(r => r.json())
            .then(d => {
                setProducts(oldvalue=> oldvalue.concat(d))
                setOriginalProducts(oldvalue=> oldvalue.concat(d))
            })
    },[]);

    const handleFilter = (e)=>{
        const value = e.target.innerText;
        if(value === 'All'){
            setProducts(originalProducts)
        }else{
            const filtered = originalProducts.filter(e=> e.type === value.toLowerCase());
            setProducts(filtered)
        }
    }

    return (
        <>
            <StyledHome>
                <StyledAside>
                    <h3>Filter</h3>
                    <nav>
                        <ul>
                            <StyledLi onClick={handleFilter}>All</StyledLi>
                            <StyledLi onClick={handleFilter}>Fruit</StyledLi>
                            <StyledLi onClick={handleFilter}>Vegetable</StyledLi>
                            <StyledLi onClick={handleFilter}>Bakery</StyledLi>
                            <StyledLi onClick={handleFilter}>Dairy</StyledLi>
                            <StyledLi onClick={handleFilter}>Meat</StyledLi>
                        </ul>
                    </nav>
                </StyledAside>
                <StyledCardsContainer>
                    {products && products.map((e,i)=> <ProductCard data={e} key={i}></ProductCard> )}

                </StyledCardsContainer>
            </StyledHome>

        </>

    )
}