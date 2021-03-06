
//is Front/MovieLine.jsx
function MovieLine ({movie}) {





    return (
        <li className="list-group-item">
            <div className="movie-line">
                <div className="movie-line__content">

                     <div className="image-holder ml-4">
                        <img style={{height:"50px"}} src={movie.nuotrauka} alt="nuotrauka"></img>
                    </div>
                    <div className="tree-line__content__comments">
                    {
                        movie.comments ? movie.comments.slice(0, -5).split('-^o^-,').map((c, i) => <div key={i}>{c}</div>) : null ////404//slice(0, -5).split('-^o^-,') atemem is app.jx komentaro gala ta katina//c-komentarai, i- indeksai//nusiimsim ta kartinuka su kableliu//vietoje katinuko galim ka nors kito papaisyti tik skaicius pasiredaguoti
                    }
                    </div>
                    <span>{movie.tekstas}</span>

                    <span>Reikalinga suma: <br></br>{movie.norimasuma} Eurų</span>
                    <span>Surinkta suma:<br></br>{movie.surinktasuma} Eurų</span>
                    <span>Liko surinkti:<br></br>{movie.likusisuma} Eurų</span>
                </div>
            </div>
        </li>
    )

}
export default MovieLine;