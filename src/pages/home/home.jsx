import { useEffect } from "react";
import { serverUrl } from "../../global-variable/global-variable.js";
import { StyledAside } from "../../styled-components/index.js";
import { useState } from "react";
import styled from "styled-components";
import ProductCard from "../../components/product-card/product-card.jsx";
import Pagination from "../../components/pagination/pagination.jsx";

const StyledHome = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    margin-bottom: 1rem;

    @media (max-width:620px){
            &{
                flex-direction: column;
                align-items: center;
            }
        }
`
const StyledCardsAndPaginationContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const StyledCardsContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;

    @media (max-width:620px){
            &{
                width: 100%;
            }
        }
`
const StyledLi = styled.li`
    list-style: none;
    padding: 1rem;
    border-bottom: 1px solid darkgray;
    transition: .5s ease-in-out;
    cursor: pointer;

    &:hover{
        background-color: darkgray;
    }
`
const StyledAsideMobile = styled.nav`

    width: 80%;

    animation: slideDown .2s ease-in;

    @keyframes slideDown{
        0%{
            transform: translateY(-200px);
        }
        100%{
            transform: translateY(0)
        }
    }
    
`
const StyledMobileFilter = styled.button`

    width: 150px;
    background-color: transparent;
    padding: 1rem;
    font-size: 1.2rem;
    cursor: pointer;

    @media (min-width:620px){
            &{
                display: none;
            }
        }
`

export default function Home() {



    const [products, setProducts] = useState([])
    const [originalProducts, setOriginalProducts] = useState([])
    const [filterOn, setFilterOn] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);


    useEffect(() => {
        fetch(`${serverUrl}products/`)
            .then(r => r.json())
            .then(d => {
                setProducts(oldvalue => oldvalue.concat(d))
                setOriginalProducts(oldvalue => oldvalue.concat(d))
            })
    }, []);

    const handleFilter = (e) => {
        const value = e.target.innerText;
        if (value === 'All') {
            setProducts(originalProducts);
            setCurrentPage(1);
        } else {
            const filtered = originalProducts.filter(e => e.type === value.toLowerCase());
            setProducts(filtered);
            setCurrentPage(1);
        }
    }

    const handleFilterDisplay = () => {
        setFilterOn(!filterOn);
    }

    const handleFilterClose = () => {
        setFilterOn(false)
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <>
            <StyledHome>
                <StyledMobileFilter onClick={handleFilterDisplay}>Filter</StyledMobileFilter>
                {
                    filterOn ?
                        <StyledAsideMobile>
                            <ul>
                                <StyledLi onClick={(e) => {
                                    handleFilter(e);
                                    handleFilterClose();
                                    setCurrentPage(1);
                                }}>All</StyledLi>
                                <StyledLi onClick={(e) => {
                                    handleFilter(e);
                                    handleFilterClose();
                                }}>Fruit</StyledLi>
                                <StyledLi onClick={(e) => {
                                    handleFilter(e);
                                    handleFilterClose();
                                }}>Vegetable</StyledLi>
                                <StyledLi onClick={(e) => {
                                    handleFilter(e);
                                    handleFilterClose();
                                }}>Bakery</StyledLi>
                                <StyledLi onClick={(e) => {
                                    handleFilter(e);
                                    handleFilterClose();
                                }}>Dairy</StyledLi>
                                <StyledLi onClick={(e) => {
                                    handleFilter(e);
                                    handleFilterClose();
                                }}>Meat</StyledLi>
                            </ul>
                        </StyledAsideMobile>
                        :
                        null
                }
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
                <StyledCardsAndPaginationContainer>
                    <StyledCardsContainer>
                        {products && currentPosts.map((e, i) => <ProductCard data={e} onFilter={handleFilter} key={i}></ProductCard>)}
                    </StyledCardsContainer>
                    <Pagination postPerPage={postsPerPage} totalPosts={products.length} currentPage={currentPage} paginate={paginate} />
                </StyledCardsAndPaginationContainer>
            </StyledHome>

        </>

    )
}