import { useEffect, useState } from 'react';
import axios from 'axios';
//import '../bootstrap.css';
import '../back.css';
import MovieEdit from './MovieEdit';
import Modal from './Modal';

// cia Movie List lentele su Edit ir Delete

function Back() {

  const [movies, setMovies] = useState([]);//--parsisiunciam kazkokiu daliku 
  //3)funkcija kuri is createData komponento paims informacija kuria reikia issiusti ir irasys serveri
  //const [createData, setCreateData] = useState(null);//3 
  const [editData, setEditData] = useState(null);//10. ir ji perduosim per Modal ir ten pasiimsim

  const [deleteId, setDeleteId] = useState(null);//8trinimo buttonas

  const [modalData, setModalData] = useState(null);//9. setModalDataperduodam i komponenta Modal ir TreeLine

  const [lastUpdate, setLastUpdate] = useState(Date.now()); //liks useState//7.cia bus data kada pirma karta reactas uzsikrauna puslapi

  // Read 
  useEffect(() => {
    axios.get('http://localhost:3004/praso-manager')
      .then(res => {
        console.log(res.data);
        setMovies(res.data);//padarom kad per cia pasiimam savo movies is serverio
      })
  }, [lastUpdate]); //7.
////////////////////////////////


  //10Edit 
  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios.put('http://localhost:3004/praso-manager/' + editData.id, editData) // !!!!!! nepamirst po manager / padeti
    .then(res => {
      console.log(res);
      setLastUpdate(Date.now());//7paskutinis pakeitimas turi buti dabartine Data
    });

  },[editData]);


  //8 Delete buttonas ir tai dar apsirasyti app.js serverio puseje
  useEffect(() => {
    if (null === deleteId) {
      return;
    }
    axios.delete('http://localhost:3004/praso-manager/' + deleteId.id, ) // !!!!!! nepamirst po manager / padeti //cia nepamirsti prie http galo prirasyti / ir prideti deleteId objekta su savybe id(jis istrins visa eilutes info) //delete-istrinti
    .then(res => {
      console.log(res);
      setLastUpdate(Date.now());//7paskutinis pakeitimas turi buti dabartine Data
    });

  },[deleteId])


  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-4">
         
        </div>
        <div className="col-8">
          <div className="card m-2">
            <div className="cardMovieList">
              <h2>Žmonių norai</h2>
            </div>
            <div className="MovieListcard-body">
              <ul className="list-group lg">
                {
                  movies.map(m => <MovieEdit key={m.id} movie={m} setDeleteId={setDeleteId} setModalData={setModalData}></MovieEdit>)
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
      {/*<Modal setEditData={setEditData} setModalData={setModalData} modalData={modalData}></Modal>{/*9.jis setModalData ir dar ziuri ka pasetinam modalData(pasirodo kai turim ka parodyti) */}
    </>
  );
}

export default Back;