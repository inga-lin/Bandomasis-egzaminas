import { useState, useRef } from "react";
import getBase64 from "../Functions/getBase64";


//cia Add New movie lentele

function Create({setCreateData}) { //{/*3pasiimam per cia savo setCreateData is App.jsx*/}
    //kadangi turim 3 irasymo laukelius tai turim juos sukontroliuoti(movie title)
    const [tekstas, setTekstas] = useState('');//(movie title-)
    const [nuotrauka, setNuotrauka] = useState('');//(movie price)
    //const [category, setCategory] = useState('1');//(movie category ir kadangi jis uzstatytas su pasirinkimu tai parasom '1')
    const [rating, setRating] = useState('');
    // 1)ir i visus imputus surasomju reiksmes (value={title}, value={category}, value={category})

    const fileInput = useRef();
    //4kai paspaudziam mygtuka mes i serveri isiunvcia informacija apie nauja suvesta zmogaus irasa
    //4kas nutinka kai paspaudziam ant mygtuko
    const buttonHandler = () => {
        const file = fileInput.current.files[0];

        if (file) {
            getBase64(file)
                .then(photo => {
                    console.log(photo);
                    setCreateData({
                        tekstas,
                        nuotrauka,
                        //type,
                        //size
                    });
                });
        } else {
            setCreateData({
                tekstas,
                nuotrauka: null,
                //type,
                
               // size
            });
        }
        setTekstas('');
        setNuotrauka('');
       // setType(1);
    }//4)ir ji perduodam i buttona onClick={buttonHandler} ir einam i server-App.js

    //2)apsirasom funkcija kuri gauna event(is pildomos lenteles(Add New movie)) ir which-kuri norim kad jis kontruoliuotu
    //2per cia galesim rasyti i lentele
    const inputHandler = (e, which) => {
        switch(which) {
            case 'tekstas': //2jeigu jis yra title tai tada setinam tai ka gaunam is setTitle(e.target.value);
            setTekstas(e.target.value);
            break;
            case 'nuotrauka': //2jeigu jis yra 'price' tai tada setinam tai ka gaunam is setPrice(e.target.value.replace(/,/g, '.')-sitas padaro kad kablelius pavestu i taska);
            setNuotrauka(e.target.value);
            break;
            //case 'category': //2jeigu jis yra 'category' tai tada setinam tai ka gaunam is setCategory(e.target.value);;
            //setCategory(e.target.value);
           // break;
            case 'norimasuma': //2jeigu jis yra 'price' tai tada setinam tai ka gaunam is setPrice(e.target.value.replace(/,/g, '.')-sitas padaro kad kablelius pavestu i taska);
            setRating(e.target.value.replace(/,/g, '.'));
            break;
            case 'surinktasuma': //2jeigu jis yra 'price' tai tada setinam tai ka gaunam is setPrice(e.target.value.replace(/,/g, '.')-sitas padaro kad kablelius pavestu i taska);
            setRating(e.target.value.replace(/,/g, '.'));
            break;
            case 'likusisuma': //2jeigu jis yra 'price' tai tada setinam tai ka gaunam is setPrice(e.target.value.replace(/,/g, '.')-sitas padaro kad kablelius pavestu i taska);
            setRating(e.target.value.replace(/,/g, '.'));
            break;
            default: //2ir juos sukisam irgi i imputus(onChange={e => inputHandler(e, 'title')},onChange={e => inputHandler(e, 'price')}, onChange={e => inputHandler(e, 'category')})
        }
    }

    return (
        <div className="back-container">
            <div className="back-title">
                <h2>Noru lentele</h2>
            </div>
            <div className="cardBodyAdd">
                <div className="form-group">
                    <label>Movie title</label>
                    <input category="text" className="form-control" onChange={e => inputHandler(e, 'tekstas')} value={tekstas} />
                    <small className="form-text text-muted">Add new movie name here.</small>
                </div>
                <div className="containerMovieGroup">
                    <div className="row">
                    <div className="col-12">
                        <div className="form-group"> {/*nuotrauka*/}
                            <label>Photo</label>
                            <input ref={fileInput} type="file" className="form-control" />
                            <small className="form-text text-muted">Tree photo.</small>
                        </div>
                        </div>
                        <div className="buttons">
                            <button type="button" className="btn btn-outline-primary m-3" onClick={buttonHandler}>Add</button>
                        </div>{/*nuotrauka*/}
                        
                        <div className="col-4">
                            <div className="form-group">
                                <label>Movie rating</label>
                                <input category="text" className="form-control" onChange={e => inputHandler(e, 'rating')} value={rating} />
                                <small className="form-text text-muted">Movie rating.</small>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="buttonsAdd">
                <button className="buttonAdd" onClick={buttonHandler}>Add</button>
            </div>
        </div>
    )
}
export default Create;