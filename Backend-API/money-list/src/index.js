const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { db } = require('./model/dbConnection');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// read
app.get('/readData', (req, res) => {
    const sqlQuery = "SELECT * FROM money";
  
    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });

  app.get('/money/:id', (req, res) => {
    const Id = req.params.id;
  
    const sqlQuery = "SELECT * FROM money WHERE id = ?";
    db.query(sqlQuery, Id, (err, result) => {
      if (err) {
        return res.json ({massage: 'Money not found!'});
      } else {
        return res.json ({massage: 'Money found!'});
      }
    });
  });

  // create
app.post('/money', (req, res) => {
    const Name = req.body.name;
    const Pronunciation = req.body.pronunciation;
    const Description = req.body.description;
  
    const sqlQuery = "INSERT INTO money (name, pronunciation, description) VALUE (?, ?, ?)";
    db.query(sqlQuery, [Name, Pronunciation, Description], (err, result) => {
      if (err) {
        return res.json ({massage: 'Money cannot post!'});
      } else {
        return res.json ({massage: 'Money posted!'});
      }
    });
  });

 // update
app.put('/updateMoney', (req, res) => {
    const Name = req.body.name;
    const Pronunciation = req.body.pronunciation;
    const Description = req.body.description;
  
    const sqlQuery = "UPDATE money SET name = ?, pronunciation = ? WHERE description = ?";
    db.query(sqlQuery, [Name, Pronunciation, Description], (err, result) => {
      if (err) {
        return res.json ({massage: 'Money cannot updated!'});
      } else {
        return res.json ({massage: 'Money updated!'});
      }
    });
  });

  // delete
app.delete('/deleteMoney/:id', (req, res) => {
    const id = req.body.id;
  
    const sqlQuery = "DELETE FROM money WHERE id = ?";
    db.query(sqlQuery, id, (err, result) => {
      if (err) {
        return res.json ({massage: 'Money cannot deleted!'});
      } else {
        return res.json ({massage: 'Money deleted!'});
      }
    });
  });

  app.listen(3000, () => {
    console.log('server berhasil berjalan pada port 3000!');
});
