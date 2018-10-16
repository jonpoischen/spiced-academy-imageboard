const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database.js');

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

app.post('/upload', uploader.single('file'), function(req, res) {
    if (req.file) {
        console.log("req.file: ", req.file);
        res.json({
            success: true
        });
    } else {
        console.log("no file");
        res.json({
            success: false
        });
    }
});

app.listen(8080, () => console.log("Listening"));
