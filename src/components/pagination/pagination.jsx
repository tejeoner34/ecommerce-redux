import styled from "styled-components";

const StyledPaginationNav = styled.nav`
    display: flex;
    justify-content: center;
`

const StyledPaginationUl = styled.ul`
    display: flex;
    gap: .5rem;

`

const StyledPaginationLi = styled.li`
    list-style: none;
    border: solid 1px darkgray;
    cursor: pointer;
    width: 30px;
    height: 30px;
    line-height: 25px;
    text-align: center;
    border-radius: 5px;

`
const StyledPaginationLiSelected = styled.li`
    list-style: none;
    border: solid 1px darkgray;
    background-color: darkgray;
    cursor: pointer;
    width: 30px;
    height: 30px;
    line-height: 25px;
    text-align: center;
    border-radius: 5px;

`

export default function Pagination({postPerPage, totalPosts, paginate, ...props}){

    const numberOfPages = [];

    for(let i = 1; i<= Math.ceil(totalPosts/postPerPage); i++){
        numberOfPages.push(i);
    }

    return(
        <StyledPaginationNav>
            <StyledPaginationUl>
                {   
                    numberOfPages.map(number=>{
                        if(number === props.currentPage){
                            return <StyledPaginationLiSelected key={number} onClick={()=>paginate(number)}>{number}</StyledPaginationLiSelected>
                        }else{
                            return <StyledPaginationLi key={number} onClick={()=>paginate(number)}>{number}</StyledPaginationLi>
                        }
                    })
                }
            </StyledPaginationUl>
        </StyledPaginationNav>
    )
}