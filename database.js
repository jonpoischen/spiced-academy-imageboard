var spicedPg = require('spiced-pg');
var secrets = require('./secrets.json');
var dbUrl = 'postgres:' + secrets.dbUser + ':' + secrets.dbPassword + '@localhost:5432/sage';
var db = spicedPg(dbUrl);

exports.getImages = function () {
    return db.query (
        `SELECT * FROM images;`
    )
    .then(function (results) {
        return results.rows;
    })
}
