import TreeLine from "./Front/TreeLine";
import { Link } from "react-router-dom"; //a.butinas linkams darant. is cia https://reactrouter.com/docs/en/v6/getting-started/overview
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import '../bootstrap.css';
import '../front.scss';
import reducer from "../Reducers/reducer";
import { getDataFromServer, sortClientHeightAsc, sortClientHeightDesc, sortClientNameAsc, sortClientNameDesc } from "../Actions"; //102 nepamirst susiimportint is Actions

function Front({ show }) { //b. pasiemam propsa is App.jsx

    //const [trees, setTrees] = useState([]); //buvo pitrmas veiksmas//buvo ir pakeiciam i nauje eilute
    const [trees, dispachTrees] = useReducer(reducer, []);//102kliento puseje. perduodam per Action/index.js, Constans/index.js, Reducer/reducer.js.js,

    const [search, setSearch] = useState('');//103 search
    const [lastUpdate, setLastUpdate] = useState(Date.now()); //302 nusikopinom is Back.jsx

    
    // Read ir 404//b
    useEffect(() => {
        axios.get('http://localhost:3003/trees-list/' + show) //b.cia vietoje http://localhost:3003/trees-manager/ rasom http://localhost:3003/trees-list/ ir pridedam propsa show
            .then(res => {
                console.log(res.data);
                dispachTrees(getDataFromServer(res.data));
            })
}, [show, lastUpdate]);//302 lastUpdate //b ir cia irasom propsa show ir dabar reik eiti i backenda savo server/app.s ir ten apsirasyti sita useEfekta

    //101 serverio puseje rusiavimas
    const serverSort = (by, dir) => {
        axios.get('http://localhost:3003/trees-list-sorted/?dir='+ dir + '&by=' + by)
        .then(res => {
            dispachTrees(getDataFromServer(res.data));//getDataFromServer pasiimam is Action/index.js
        });
    }

    //103 search
    const doSearch = e => {
        setSearch(e.target.value); //cia yra reiksme kurios ieskosim (e.target.value)
        axios.get('http://localhost:3003/trees-list-search/?s='+ e.target.value) //ieskom e.target.value
        .then(res => {
            dispachTrees(getDataFromServer(res.data));//getDataFromServer pasiimam is Action/index.js
        });
    }
    
    //302 {saveVote} ir ji perduodam i Front/TreeLine.jsx per <TreeLine>
    const saveVote = (id, value) => {
        axios.post('http://localhost:3003/trees-vote/' + id, {vote: value}) //arba su + '/'  //http://localhost:3003/trees-vote/' linkas kuri mes issiunciam i serveri kad galetumem votint, atiduodam jam id(ka mes siunciam) ir rezultata{vote: value}
        .then(res => {
            setLastUpdate(Date.now()) //cia gaunam rezultata 
        });
    }

    //40004 komentarai
    const saveComment = (id, value) => {
        axios.post('http://localhost:3003/trees-comment/' + id, {comment: value})//{comment: ... -objektas}
        .then(res => {
            setLastUpdate(Date.now());
        });
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="/">Tree Shop</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <Link className="nav-link" to="/">Home</Link>  {/*//a.butinas linkams (<Link className="nav-link" to="/">Home</Link>)*/}
                                    <Link className="nav-link" to="/leaf">Leaf</Link>{/*//a.butinas linkams /leaf nurodo kaip i ji patekti i http://localhost:3000/leaf*/}
                                    <Link className="nav-link" to="/spike">Spike</Link>{/*//a.butinas linkams*/}
                                    <Link className="nav-link" to="/palm">Palm</Link>{/*//a.butinas linkams*/}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <ul className="list-group">
                            {
                                trees.map(t => <TreeLine key={t.id} tree={t} saveVote={saveVote} saveComment={saveComment}></TreeLine>) //300 302saveVote//40004 saveComment
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-2"> {/*102 rusiuojam su Reducer*/}
                        <span>By name <small>client</small>:</span>
                        <div className="arrows">
                        <svg className="up" onClick={() => dispachTrees(sortClientNameAsc())}>{/*102 sortClientNameAsc() jis ateina is Action/index.js*/}
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        <svg className="down"  onClick={() => dispachTrees(sortClientNameDesc())}>{/*102 sortClientNameDesc() jis ateina is Action/index.js*/}
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        </div>
                    </div>
                    <div className="col-2">{/*102 rusiuojam su Reducer*/}
                        <span>By height <small>client</small>:</span>
                        <div className="arrows">
                        <svg className="up"  onClick={() => dispachTrees(sortClientHeightAsc())}>{/*102 sortClientHeightAsc() jis ateina is Action/index.js*/}
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        <svg className="down"  onClick={() => dispachTrees(sortClientHeightDesc())}>{/*102 sortClientHeightDesc() jis ateina is Action/index.js*/}
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        </div>
                    </div>
                    <div className="col-2">{/*101 rusiuojam su serveriu*/}
                    <span>By name <small>server</small>:</span>
                        <div className="arrows">
                        <svg className="up" onClick={() => serverSort('title', 'asc')}> {/*serveryje name*/}
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        <svg className="down"  onClick={() => serverSort('title', 'desc')}>{/*serveryje name*/}
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        </div>
                    </div>
                    <div className="col-2">{/*101 rusiuojam su serveriu*/}
                    <span>By height <small>server</small>:</span>
                        <div className="arrows">
                        <svg className="up"  onClick={() => serverSort('height', 'asc')}>
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        <svg className="down"  onClick={() => serverSort('height', 'desc')}>
                            <use xlinkHref="#arrow"></use>
                        </svg>
                        </div>
                    </div>
                    <div className="col-2">
                    <div className="form-group">
                        <label>Search</label>{/*103*/}
                        <input type="text" className="form-control" onChange={doSearch} value={search} placeholder="Search" />
                        <small className="form-text text-muted">Add new tree name here.</small>
                    </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Front;