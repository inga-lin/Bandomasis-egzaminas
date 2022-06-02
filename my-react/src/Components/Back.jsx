
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../bootstrap.css';
import '../back.scss';
import Create from './Create';
import TreeLine from './TreeLine';
import Modal from './Modal';
import CreateSize from './CreateSize'; //808
import SizeList from './SizeList';
import { Link } from 'react-router-dom';//900
import { authConfig } from '../Functions/auth';//900 reikalingas admino paskyrai su slaptazodziu
// cia Tree List lentele

function Back() {

  const [trees, setTrees] = useState([]);//--parsisiunciam kazkokiu daliku 
  //3)funkcija kuri is createData komponento paims informacija kuria reikia issiusti ir irasys serveri
  const [createData, setCreateData] = useState(null);//3 
  const [editData, setEditData] = useState(null);//10. ir ji perduosim per Modal ir ten pasiimsim

  const [deleteId, setDeleteId] = useState(null);//8trinimo buttonas

  const [modalData, setModalData] = useState(null);//9. setModalDataperduodam i komponenta Modal ir TreeLine

  const [lastUpdate, setLastUpdate] = useState(Date.now()); //liks useState//7.cia bus data kada pirma karta reactas uzsikrauna puslapi

  const [createSizeData, setCreateSizeData] = useState(null);//800
  const [sizes, setSizes] = useState([]);//800-801

  const [deleteSizeId, setDeleteSizeId] = useState(null);//1000
  // Read //buvo be admino slaptazodzio axios.get('http://localhost:3003/trees-manager') //900su admino slaptazodziu axios.get('http://localhost:3003/admin/trees-manager', authConfig())
  useEffect(() => {
    axios.get('http://localhost:3003/admin/trees-manager', authConfig())//900 reikalingas admino paskyrai su slaptazodziu
      .then(res => {
        console.log(res.data);
        setTrees(res.data);//padarom kad per cia pasiimam savo trees is serverio
      })
  }, [lastUpdate]); //7.

  //Create
  //3)funkcija kuri is createData komponento paims informacija kuria reikia issiusti ir irasys serveri
  //3)useEffect pas mus vyks kai pasikeis creatoData
  useEffect(() => {
    if (null === createData) { //3)jeigu createData yra === null nieko nedarom ir einam lauk is cia
      return;
    }
    axios.post('http://localhost:3003/trees-manager', createData)//3)kai jis  jau tures kazka naujo tai ta nauja info dedam i 'http://localhost:3003/trees-manager', createData //post-isiusti
    .then(res => {
      console.log(res);  //3)console.log(res) pasiziurim ka mums servas atsakys
      setLastUpdate(Date.now()) }); //7paskutinis pakeitimas turi buti dabartine Data
  },[createData])

  //10Edit 
  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios.put('http://localhost:3003/trees-manager/'+ editData.id, editData) //
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
    axios.delete('http://localhost:3003/trees-manager/' + deleteId.id, ) //cia nepamirsti prie http galo prirasyti / ir prideti deleteId objekta su savybe id(jis istrins visa eilutes info) //delete-istrinti
    .then(res => {
      console.log(res);
      setLastUpdate(Date.now());//7paskutinis pakeitimas turi buti dabartine Data
    });

  },[deleteId])


  const deleteComment = id => {//700 istrinam komentarus is Components/TreeLine.jsx
    axios.delete('http://localhost:3003/trees-delete-comment/' + id, ) //cia nepamirsti prie http galo prirasyti / ir prideti deleteId objekta su savybe id(jis istrins visa eilutes info) //delete-istrinti
    .then(res => {
      console.log(res);
      setLastUpdate(Date.now());//7paskutinis pakeitimas turi buti dabartine Data
    });
  }


  useEffect(() => {//800 size list lentele
    axios.get('http://localhost:3003/admin/trees-sizes', authConfig()) //900 pasidejau cia admin ir authConfig()
        .then(res => {
            console.log(res.data);
            setSizes(res.data);
        })
}, [lastUpdate]);

//801 size list lentele
useEffect(() => {
  if (null === createSizeData) {
    return;
  }
  axios.post('http://localhost:3003/trees-size', createSizeData)
  .then(res => {
    console.log(res);
    setLastUpdate(Date.now());
  });
},[createSizeData]);

    //Delete SIZE 1000
    useEffect(() => {
      if (null === deleteSizeId) {
        return;
      }
      axios.delete('http://localhost:3003/trees-manager-sizes/' + deleteSizeId.id,)
        .then(res => {
          console.log(res);
          setLastUpdate(Date.now());
        });

    }, [deleteSizeId])

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Link to="/logout">Log OUT</Link>{/*900*/}
          </div>
        </div>
      </div>
    <div className="container">
      <div className="row">
        <div className="col-4">
          <Create sizes={sizes} setCreateData={setCreateData} lastUpdate={lastUpdate}></Create> {/*3 perduodam setCreateData i Create.jsx*/}
          <CreateSize setCreateSizeData={setCreateSizeData}></CreateSize>{/*800*/}
          {/*<SizeList sizes={sizes}></SizeList> buvo be 1000toks{/*801*/}
          <SizeList sizes={sizes} setDeleteSizeId={setDeleteSizeId}></SizeList>{/*1000*/}
        </div>
        <div className="col-8">
          <div className="card m-2">
            <div className="card-header">
              <h2>Tree List</h2>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {
                   trees.map(t => <TreeLine key={t.id} tree={t} setDeleteId={setDeleteId} setModalData={setModalData} deleteComment={deleteComment}></TreeLine>)// 700 deleteComment
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
   {/* buvo toks be 1000 <Modal setEditData={setEditData} setModalData={setModalData} modalData={modalData}></Modal>{/*9.jis setModalData ir dar ziuri ka pasetinam modalData(pasirodo kai turim ka parodyti) */}
   <Modal  sizes={sizes} setEditData={setEditData} setModalData={setModalData} modalData={modalData}></Modal>{/*1000*/}
    </>
  );
}

export default Back;
