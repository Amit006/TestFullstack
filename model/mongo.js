"use strict";
var MongoClient = require('mongodb').MongoClient;
var connection = require('./connection.json').development;
var assert = require('assert');
function getdbUrl(){
    var url = 'mongodb+srv://Frost006:MongoCode006@cluster0-imhnn.mongodb.net/test?retryWrites=true&w=majority';
    // if (connection.user.length == 0 || connection.user == ' ') {
    //     url =  'mongodb://' + connection.url + ':' + connection.port + '/' + connection.db;
    // } else {
    //     url = 'mongodb://' + connection.user + ':' + connection.password + '@' + connection.url + ':' + connection.port + '/' + connection.db;
    // }
    return url;
}
function getdbPort(){
    return connection.port;
}
var runDB = function (callback) {
    MongoClient.connect(getdbUrl(), { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
        assert.equal(null, err);
        var db = client.db(connection.db);
        // module.exports.licence = db.collection('licence');
        module.exports.posts = db.collection('posts');
        module.exports.comments = db.collection('comments');
        module.exports.albums = db.collection('albums');
        module.exports.photos = db.collection('photos');
        module.exports.todos = db.collection('todos');
        module.exports.users = db.collection('users');
        callback (err, getdbPort());
    });
};

module.exports = {
    runDB: runDB
};
