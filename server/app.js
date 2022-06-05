const express = require('express')
const app = express();
const port = 3004;
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');
md5 = require('js-md5');
const uuid = require('uuid');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(
  express.urlencoded({
    extended: true,
  })
);
    
app.use(express.json());
    
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aukos_tau',
});

//Route
//jis nurodo kokius puslapus paleidzia routas http://localhost:3004/ http://localhost:3004/filmai-manager
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//kaip nuskaito
app.get('/praso-manager', (req, res) => {       // <- http://localhost:3004/filmai-manager api puslapio pavadinimas
// SELECT column1, column2, ...
// FROM table_title;
const sql = `
SELECT
*
FROM praso   
`;
con.query(sql, function(err, result) {
if (err) throw err;
res.json(result);
});
});





///////////////////////////////////
//b.apsirasom Fronts.jsx useEffect
//b.jeigu all siunciam viena uzklausa o jeigu ne all siunciam kita uzklausa(req.params.cat != "all") kuri isfiltruoja ko butent norim ar leaf','spike','palm
app.get("/praso-list/all", (req, res) => { //all atskiras routas visu medziu gavimui
  const sql = `
  SELECT
  *
  FROM praso
`;
  con.query(sql, (err, result) => {
  if (err) throw err;
  res.send(result);
});

})

//app.get("/praso-list/:cat", (req, res) => { //cat yra parametras jeigu tai neta all iesko 'leaf','spike','palm' ir kazkuri is ju atidaro
//if (req.params.cat != "all") {
//const sql = `
//      SELECT
//      *
//     FROM praso
//      WHERE sukurkideja = ?
// `;
//con.query(sql, [['sukurkideja'].indexOf(req.params.cat) + 1], (err, result) => { //b.mes gaunam zodzius ir juos paverciam i indeksa
//if (err) throw err;
//res.send(result);
//});
//}
//});

//////////////////////////

//5)kaip iraso nauja info i duomenu baze
app.post('/praso-manager', (req, res) => {
// INSERT INTO table_title (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);
//(INSERT INTO filmai-musu duomenu bazes pavadinimas)
//(title, price, category)- musu duomenu bazes lenteles stulpeliu pavadinimai
//VALUES (?, ?, ?) -paruosiam vieta deti duomenim(kiek pavadinimu tiek ir klaustuku turi buti!!!!!!!!!!!!!)
const sql = `
  INSERT INTO praso
  (tekstas, nuotrauka, norimasuma, surinktasuma, likusisuma)
  VALUES (?, ?, ?, ?, ?)
`;

con.query(sql, [ //cia tvarka turi sutapt su lenteles uzrasais, ir is cia paimam ta nauja info ir sudedam i musu serveri ir po to matysim tai Tree List (paspaudus App mygtuka ir perkrovus puslapi)
  req.body.tekstas,
  req.body.nuotrauka,
  //!req.body.price ? 0 : req.body.price, //jeigu aukscio lenteleje nieko neirasysim bus 0
  !req.body.norimasuma ? 0 : req.body.norimasuma,
  !req.body.surinktasuma ? 0 : req.body.surinktasuma,
  !req.body.likusisuma ? 0 : req.body.likusisuma,
], (err, results) => {
  if (err) {
      throw err;
  }
  res.send(results);
})

});

//8. Trina filmus
// DELETE FROM table_title
// WHERE some_column = some_value
app.delete('/praso-manager/:id', (req, res) => { //delytinam is filmai lnteles kurio id yra ?(kazkoks)
  const sql = `
    DELETE FROM praso
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => { //[req.params.id] yra = '/filmai-manager/:id'
    if (err) {
        throw err;
    }
    res.send(result);
  })
})

// 10.Redaguoja filmus/
// UPDATE table_title
// SET column1 = value1, column2 = value2, ...
// WHERE condition;
app.put('/praso-manager/:id', (req, res) => {
  const sql = `
    UPDATE praso
    SET title = ?, nuotrauka = ?, norimasuma = ?, surinktasuma = ?, likusisuma = ?
    WHERE id = ?
  `;
  con.query(sql, [
    req.body.title,
    req.body.nuotrauka,
    req.body.norimasuma,
    req.body.surinktasuma,
    req.body.likusisuma,
    req.params.id
  ], (err, results) => {
    if (err) {
        throw err;
    }
    res.send(results);
  })
})



//komentarai
app.post("/praso-comment/:id", (req, res) => {
    const sql = `
      INSERT INTO praso
      (tekstas)
      VALUES (?)
      `;
    con.query(
      sql,
      [req.body.comment, req.params.id],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.send(results);
      }
    );
  });
  



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})