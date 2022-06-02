const express = require('express');
const app = express();
const port = 3003;
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(
    express.urlencoded({
      extended: true,
    })
  );
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "aukos_tau",
});

app.get("/praso-manager", (req, res) => {
    // SELECT column1, column2, ...
    // FROM table_name;
    const sql = `
          SELECT
          *
          FROM praso
      `;
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
