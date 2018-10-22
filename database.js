var spicedPg = require('spiced-pg');
var secrets = require('./secrets.json');
var dbUrl = 'postgres:' + secrets.dbUser + ':' + secrets.dbPassword + '@localhost:5432/sage';
var db = spicedPg(dbUrl);

exports.getImages = function() {
    return db.query (
        `SELECT *
        FROM images
        ORDER BY id DESC
        LIMIT 9;
        `
    )
    .then(function (results) {
        return results.rows;
    })
}

exports.getMoreImages = function(id) {
    return db.query (
        `SELECT *
        FROM images
        WHERE id < $1
        ORDER BY id DESC
        LIMIT 9;
        `,
        [id]
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
        `INSERT INTO images
        (url, username, title, description)
        VALUES ($1, $2, $3, $4)
        returning *;`,
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

exports.addComment = function(id, comment, username) {
    return db.query (
        `INSERT INTO comments
        (comment, username, image_id)
        VALUES ($1, $2, $3)
        `,
        [comment, username, id]
    )
}
