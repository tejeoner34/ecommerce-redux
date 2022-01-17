
export default function Pagination({postPerPage, totalPosts, paginate}){

    const numberOfPages = [];

    for(let i = 1; i<= Math.ceil(totalPosts/postPerPage); i++){
        numberOfPages.push(i);
    }

    return(
        <nav>
            <ul>
                {
                    numberOfPages.map(number=><li key={number} onClick={()=>paginate(number)}>{number}</li>)
                }
            </ul>
        </nav>
    )
}