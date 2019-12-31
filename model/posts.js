"use strict";
var guid = require('guid');
var ObjectId = require('mongodb').ObjectID;
var mongo = require('./mongo');
var jwt = require('jsonwebtoken');



var getAllPosts = function (callback) {
    mongo.posts.find({ status: false}).project({
        userId: 1,
        id: 1,
        title: 1,
        body: 1
    }).toArray((  err, result) => {
        console.log(' result: ', result, ' err: ', err);
        if (err) {
            callback(err);
            return;
        }
        if (result === null) {
            var error = new Error("No Posts Found. One Requested.");
            error.status = 404;
            callback(error);
            return;
        }
        callback(null, result);
    });
};
var getOnePost  = function ( idnum, callback) {
    console.log('id: ', idnum);
    mongo.posts.findOne({ 'id' : Number(idnum), status: false}).then((result, err) => {
        console.log(' result: ', result, ' err: ', err);
        if (err) {
            callback(err);
            return;
        }
        if (result === null) {
            var error = new Error("No Posts Found. One Requested.");
            error.status = 404;
            callback(error);
            return;
        }
        callback(null, result);
    });
};
var getPostAllCommands = function ( idnum, callback) {
    console.log('id: ', idnum);
    mongo.comments.find({ 'postId' : Number(idnum)}).toArray(( err, result) => {
        console.log(' result: ', result, ' err: ', err);
        if (err) {
            callback(err);
            return;
        }
        if (result === null) {
            var error = new Error("No Posts Found. One Requested.");
            error.status = 404;
            callback(error);
            return;
        }
        callback(null, result);
    });
};
var getPostAllUsers  = function ( idnum, callback) {
    mongo.posts.find({ 'userId' : Number(idnum), status: false}).toArray(( err, result) => {
        console.log(' result: ', result, ' err: ', err);
        if (err) {
            callback(err);
            return;
        }
        if (result === null) {
            var error = new Error("No Posts Found. One Requested.");
            error.status = 404;
            callback(error);
            return;
        }
        callback(null, result);
    });
};

// All POST REQUEST
var addPosts = function (Posts, callback) {
    mongo.posts.find().sort({'id':-1}).limit(1).toArray( (err, maxData) => {
        Posts['id'] = maxData[0].id+1;
        mongo.posts.insertOne(Posts, function (err, data) {
            if (err) {
                return callback({msg: ' Error Occurred  ' + err.message}, null);
            }
            delete data.ops[0]._id;
            callback(null, data.ops[0]);
        });
    });
};
var updatePosts = function (condation, Posts, callback) {
        mongo.posts.updateOne(Object.assign({ status: false}, condation), {
            $set:Posts
        },{},function (err, data) {
            if (err) {
                return callback({msg: ' Error Occurred  ' + err.message}, null);
            }
            callback(null, Posts);
        });
};
var updatePostsPatch = function (condation, Posts, callback) {
        mongo.posts.findOneAndUpdate( Object.assign(condation, { status: false}), {
            $set:Posts
        },{},function (err, data) {
            console.log(' err: ', err, ' data: ', data);
            if (err) {
                return callback({msg: ' Error Occurred  ' + err.message}, null);
            }
            var returnObj = data.value ? {
                    userId: data.value.userId,
                    id: data.value.id,
                    title: Posts.title,
                    body: data.value.body
                } : { error : "allready deleted "}
            callback(null, );
        });
};
var updatePostsDelete = function (condation, Posts, callback) {
        mongo.posts.findOneAndUpdate(condation, {
            $set:Posts
        },{},function (err, data) {
            console.log(' err: ', err, ' data: ', data);
            if (err) {
                return callback({msg: ' Error Occurred  ' + err.message}, null);
            }
            callback(null,true);
        });
};


module.exports = {
    addPosts: addPosts,
    getAllPosts: getAllPosts,
    getOnePost: getOnePost,
    getPostAllCommands: getPostAllCommands,
    getPostAllUsers: getPostAllUsers,
    updatePosts: updatePosts,
    updatePostsPatch: updatePostsPatch,
    updatePostsDelete: updatePostsDelete,
};
