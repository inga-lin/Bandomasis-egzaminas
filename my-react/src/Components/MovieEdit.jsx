
//Movie List lentele
function MovieEdit({ movie, setDeleteId, setModalData }) {
    // movie List lentele
    return (
        <li className="list-group-item">
            <div className="movie-line">
                <div className=" movie-line__content mlc">
                    <span>{movie.tekstas}</span>
                    <span>{movie.price} Euro</span>
                    <span>{['Documentary','Family','Animation','Drama','Horror'][movie.category - 1]}</span>
                    <span>Rating: {movie.rating} </span>{/*is masyvo ['Leaf','Spike','Palm'] paimam viena konkretu elementa [movie.type - 1]*/}
                    
                </div>
                <div className="buttonEditDeletle movie-line__buttons">
                   <button type="button" className="buttonEdit" onClick={()=>setModalData(movie)}>Edit</button>
                   <button type="button" className="buttonDelete" onClick={()=>setDeleteId({id:movie.id})}>Delete</button>
                </div>
            </div>
        </li>
    )
}
    
    export default MovieEdit;