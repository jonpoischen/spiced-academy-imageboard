var spicedPg = require('spiced-pg');
var secrets = require('./secrets.json');
var dbUrl = 'postgres:' + secrets.dbUser + ':' + secrets.dbPassword + '@localhost:5432/sage';
var db = spicedPg(dbUrl);

exports.getImages = function() {
    return db.query (
        // `SELECT *
        // FROM images
        // WHERE id < $1
        // ORDER BY id DESC
        // LIMIT 21;
        // `,
        // [id]
        `SELECT *
        FROM images
        ORDER BY id DESC
        LIMIT 21;
        `
    )
    .then(function (results) {
        return results.rows;
    })
}

exports.getModalData = function(id) {
    return db.query (
        `SELECT *
        FROM images
        WHERE id = $1;
        `,
        [id]
    )
    .then(function (results) {
        return results.rows;
    })
}

exports.uploadImages = function(url, username, title, description) {
    return db.query (
        `INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4) returning *;`,
        [url, username, title, description]
    )
    .then(function (results) {
        return results.rows;
    })
}

exports.getComments = function(id) {
    return db.query (
        `SELECT *
        FROM comments
        WHERE image_id = $1;
        `,
        [id]
    )
    .then(function (results) {
        return results.rows;
    })
}
