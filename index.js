const spicedPg = require('spiced-pg');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const secrets = require('./secrets.json');
const dbUrl = 'postgres:' + secrets.dbUser + ':' + secrets.dbPassword + '@localhost:5432/sage';
const db = spicedPg(dbUrl);

app.use(bodyParser.json());

app.use(express.static('./public'));

function getImages () {
    return db.query (
        `SELECT * FROM images;`
    )
    .then(function (results) {
        // console.log("Results: ",results.rows);
        return results.rows;
    })
}

app.get('/images', function(req, res) {
    getImages().then(data => {
        res.json(data);
    })
})

app.get('/cities', function(req, res) {
    res.json([
        {
            name: 'Berlin',
            country: 'Germany'
        },
        {
            name: 'Hamburg',
            country: 'Germany'
        },
        {
            name: 'Heidelberg',
            country: 'Germany'
        }
    ]);
})

app.listen(8080, () => console.log("Listening"));
