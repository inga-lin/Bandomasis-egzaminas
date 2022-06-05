import { useState } from "react";
//is Front/MovieLine.jsx
function MovieLine ({movie , saveComment}) {

const [comment, setComment] = useState('');//40004 komentaro atvaizdavimas
//40004 komentaro atvaizdavimas
const clickComment = () => {
    saveComment(movie.id, comment);//saveComment perduoda tree.id ir comment is useState
    setComment('');//kai issiunciam konentara laukeli paverciam i tuscia laukeli
} 
 
    return (
        <li className="list-group-item">
            <div className="movie-line">
                <div className="movie-line__content">
                    <div className="form-group ml-4">
                        <textarea className="form-control" onChange={e => setComment(e.target.value)} value={comment} placeholder="Comment" />{/*40004 komentaro atvaizdavimas*/}
                    </div>
                    <button type="button" className="btn btn-outline-success ml-2" onClick={clickComment}>Comment</button>{/*40004 komentaro atvaizdavimas*/}
                    <div className="tree-line__content__comments">
                    {
                        movie.comments ? movie.comments.slice(0, -5).split('-^o^-,').map((c, i) => <div key={i}>{c}</div>) : null ////404//slice(0, -5).split('-^o^-,') atemem is app.jx komentaro gala ta katina//c-komentarai, i- indeksai//nusiimsim ta kartinuka su kableliu//vietoje katinuko galim ka nors kito papaisyti tik skaicius pasiredaguoti
                    }
                    </div>
                    <span>{movie.tekstas}</span>
                    <div className="image-holder ml-4">
                        <img src={movie.nuotrauka} alt="nuotrauka"></img>
                    </div>
                    <span>{movie.norimasuma} Euro</span>
                    <span>{movie.surinktasuma} Euro</span>
                    <span>{movie.likusisuma} Euro</span>
                </div>
            </div>
        </li>
    )

}
export default MovieLine;