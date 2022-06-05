
//Movie List lentele
function MovieEdit({ movie, setDeleteId, setModalData }) {
    // movie List lentele
    return (
        <li className="list-group-item">
            <div className="movie-line">
                <div className=" movie-line__content mlc">
                <div className="image-holder ml-4">
                        <img style={{height:"50px"}} src={movie.nuotrauka} alt="nuotrauka"></img>
                    </div>
                <span>Reikalinga suma: <br></br>{movie.norimasuma} Eurų</span>
                    <span>Norai:<br></br> {movie.tekstas}</span>
                </div>
                <div className="buttonEditDeletle movie-line__buttons">
                   <button type="button" className="buttonEdit" onClick={()=>setModalData(movie)}>Patvirtinti</button>
                   <button type="button" className="buttonDelete" onClick={()=>setDeleteId({id:movie.id})}>Ištrinti</button>
                </div>
            </div>
        </li>
    )
}
    
    export default MovieEdit;