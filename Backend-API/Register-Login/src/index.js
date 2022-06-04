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
    const sqlQuery = "SELECT * FROM registrasi";
  
    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });

  app.get('/user/:id', (req, res) => {
    const Id = req.params.id;
  
    const sqlQuery = "SELECT * FROM registrasi WHERE id = ?";
    db.query(sqlQuery, Id, (err, result) => {
      if (err) {
        return res.json ({massage: 'User not found!'});
      } else {
        return res.json ({massage: 'User found!'});
      }
    });
  });

  // create
app.post('/registrasi', (req, res) => {
    const Name = req.body.name;
    const Password = req.body.password;
    const Confirm_Password = req.body.confirm_password;
  
    const sqlQuery = "INSERT INTO registrasi (name, password, confirm_password) VALUE (?, ?, ?)";
    db.query(sqlQuery, [Name, Password, Confirm_Password], (err, result) => {
      if (err) {
        return res.json ({massage: 'User cannot registered!'});
      } else {
        return res.json ({massage: 'User registered!'});
      }
    });
  });

 // update
app.put('/updateUser', (req, res) => {
    const Name = req.body.name;
    const Password = req.body.password;
    const Confirm_Password = req.body.confirm_password;
  
    const sqlQuery = "UPDATE registrasi SET name = ?, password = ? WHERE confirm_password = ?";
    db.query(sqlQuery, [Name, Password, Confirm_Password], (err, result) => {
      if (err) {
        return res.json ({massage: 'User cannot updated!'});
      } else {
        return res.json ({massage: 'User updated!'});
      }
    });
  });

  // delete
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.body.id;
  
    const sqlQuery = "DELETE FROM registrasi WHERE id = ?";
    db.query(sqlQuery, id, (err, result) => {
      if (err) {
        return res.json ({massage: 'User cannot deleted!'});
      } else {
        return res.json ({massage: 'User deleted!'});
      }
    });
  });

  app.listen(3000, () => {
    console.log('server berhasil berjalan pada port 3000!');
});
