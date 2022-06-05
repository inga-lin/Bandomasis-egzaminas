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
                    <a className="Movie-rent" href="/">Movies rent</a>
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Home</Link>  {/*//a.butinas linkams (<Link className="nav-link" to="/">Home</Link>)*/}
                        <Link className="nav-link" to="/sukurkideja">Sukurk idėją</Link>{/*//a.butinas linkams /leaf nurodo kaip i ji patekti i http://localhost:3000/leaf*/}
                       <Create setCreateData={setCreateData}></Create>
                    </div>   
                </nav>
            </div>
            <div className="container2">
                <h1 className="title">Movie</h1>
                <ul className="list-group">
                    {
                         movies.map(m => <MovieLine key={m.id} movie={m} saveComment={saveComment}></MovieLine>)
                    }
                </ul>
            </div>
            <div className="container3 mt-4">
                <div className="row">
                    <div className="col-12">
                        <div className="arrows">
                        <svg className="up">
                            <use xlinkHref="#arrow"></use> {/*d.cia bus rodykles is googles svg arrow. ja isimetam i public/index.html body vieta:
                                                           <svg style="display:none" xmlns="http://www.w3.org/2000/svg">
                                                           <symbol id="arrow" viewBox="0 0 512 512"><path d="M295.6 163.7c-5.1 5-5.1 13.3-.1 18.4l60.8 60.9H124.9c-7.1 0-12.9 5.8-12.9 13s5.8 13 12.9 13h231.3l-60.8 60.9c-5 5.1-4.9 13.3.1 18.4 5.1 5 13.2 5 18.3-.1l82.4-83c1.1-1.2 2-2.5 2.7-4.1.7-1.6 1-3.3 1-5 0-3.4-1.3-6.6-3.7-9.1l-82.4-83c-4.9-5.2-13.1-5.3-18.2-.3z"/></symbol>
                                                           </svg>
                                                           o cia fromt.jsx ji pasiimam is ten per id="arrov" o cia uzvadinam xlinkHref="#arrow"
                                                           ir front.scss pasisukam kaip mums reik*/}
                        </svg>
                        <svg className="down">
                            <use xlinkHref="#arrow"></use> {/*d.cia bus rodykles is googles svg arrow ir front.scss pasisukam kaip mums reik*/}
                        </svg>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>

    )
}

export default Front;