import styled from "styled-components";

export const StyledAside = styled.aside`
        position: sticky;
        top: 150px;
        left: 0;
        width: 200px;
        height: fit-content;
        background-color: #e8e8e88a;
        padding: 1rem;
        -webkit-box-shadow: 0px 6px 11px -2px rgba(0,0,0,0.46); 
        box-shadow: 0px 6px 11px -2px rgba(0,0,0,0.46);

        @media (max-width:620px){
            &{
                display: none;
            }
        }
    `