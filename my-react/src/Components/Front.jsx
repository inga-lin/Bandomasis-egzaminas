import MovieLine from "./Front/MovieLine";
import { Link } from "react-router-dom"; //a.butinas linkams darant. is cia https://reactrouter.com/docs/en/v6/getting-started/overview
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../front.css';
import Create from "./Create";
//import '../bootstrap.css';
//import '../front.scss';


//cia bus ka klientas matys http://localhost:3001  
function Front({ show }) { //b. pasiemam propsa is App.jsx

    const [movies, setMovies] = useState([]);
    const [lastUpdate, setLastUpdate] = useState(Date.now()); 



    const [createData, setCreateData] = useState(null);



    // Read
    useEffect(() => {
        axios.get('http://localhost:3004/praso-list/' + show) // !!!!!! nepamirst po list / padeti //b.cia vietoje http://localhost:3003/filmai-manager/ rasom http://localhost:3003/filmai-list/ ir pridedam propsa show
            .then(res => {
                console.log(res.data);
                setMovies(res.data);
            })
    }, [show, lastUpdate]);//b ir cia irasom propsa show ir dabar reik eiti i backenda savo server/app.s ir ten apsirasyti sita useEfekta


        //40004 komentarai
        const saveComment = (id, value) => {
            axios.post('http://localhost:3004/praso-comment/' + id, {comment: value})//{comment: ... -objektas}
            .then(res => {
                setLastUpdate(Date.now());
            });
        }



  //Create
  //3)funkcija kuri is createData komponento paims informacija kuria reikia issiusti ir irasys serveri
  //3)useEffect pas mus vyks kai pasikeis creatoData
  useEffect(() => {
    if (null === createData) { //3)jeigu createData yra === null nieko nedarom ir einam lauk is cia
      return;
    }
    axios.post('http://localhost:3004/praso-manager', createData)//3)kai jis  jau tures kazka naujo tai ta nauja info dedam i 'http://localhost:3003/movies-manager', createData //post-isiusti
    .then(res => {
      console.log(res);  //3)console.log(res) pasiziurim ka mums servas atsakys
      setLastUpdate(Date.now()) }); //7paskutinis pakeitimas turi buti dabartine Data
  },[createData])




    return (
        <>
        <div className="front-color">
            <div className="container1">
                <nav className="navbar">
                    <a className="Movie-rent" href="/">Išpildyk norą</a>
                    <div className="navbar-nav nnnn">
                        <Link className="nav-link" to="/">Home</Link>  {/*//a.butinas linkams (<Link className="nav-link" to="/">Home</Link>)*/}
                        <Link className="nav-link" to="/sukurkideja">Sukurk idėją</Link>{/*//a.butinas linkams /leaf nurodo kaip i ji patekti i http://localhost:3000/leaf*/}
                    </div>   
                </nav>
            </div>
            <Create setCreateData={setCreateData}></Create>
            <div className="container2">
                <h1 className="title">Žmonių norai</h1>
                <ul className="list-group">
                    {
                         movies.map(m => <MovieLine key={m.id} movie={m} saveComment={saveComment}></MovieLine>)
                    }
                </ul>
            </div>
            <br></br>
            </div>
        </>

    )
}

export default Front;