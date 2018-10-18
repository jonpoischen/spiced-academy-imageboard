const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database.js');
const s3 = require('./s3.js');
const {s3Url} = require('./config.json');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(bodyParser.json());

app.use(express.static('./public'));

app.get('/images', function(req, res) {
    db.getImages().then(data => {
        res.json(data);
    }).catch(err => {console.log(err)});
});

app.post('/upload', uploader.single('file'), s3.upload, function(req, res) {
    const imgUrl = s3Url + req.file.filename;
    db.uploadImages(imgUrl, req.body.username, req.body.title, req.body.desc)
    .then(results => {
        res.json(results);
    })
    .catch(err => {console.log(err)});
});

app.get('/image-modal', function(req, res) {
    db.getModalData(req.query.id)
    .then(resp => {
        db.getComments(req.query.id)
        .then(results => {
            res.json({
                results,
                resp
            })
        })
        .catch(err => {console.log(err)});
    })
    .catch(err => {console.log(err)});
})

app.listen(8080, () => console.log("Listening"));
