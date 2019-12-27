"use strict";
var guid = require('guid');
var ObjectId = require('mongodb').ObjectID;
var mongo = require('./mongo');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


var addPosts = function (Posts, callback) {
    console.log(' Posts: addPosts ', Posts);

    mongo.licence.findOne({ _id: Posts._id}).then( ( resData, errfind) => {
        // console.log(' Posts.Order_Number: ', Posts._id, ' resData: ', resData, ' errfind: ', errfind);

        if (errfind) {
            return callback({ msg: "Some Error Ocurred FindLicence "}, null);;
        }

        if(resData){
            console.log(' from here');
            callback({msg: " Licence already exist.", Product_Key: resData.Product_Key} , null);
        } else {
            console.log(' Licence: ---', Posts);
            mongo.posts.insertOne(Posts.data, function (err, data) {
                console.log(' err: ', err, ' result-data: ', data.ops[0]);

                if (err) {
                    return callback({msg: ' Error Occurred  '+ err.message }, null);
                }

                callback(null,{ n: data.result.n, insertedCount: data.insertedCount , ops: data.ops[0]});
            });
        }
    });
};
var getAllPosts = function (callback) {
    mongo.posts.find({}).toArray((  err, result) => {
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
    mongo.posts.findOne({ 'id' : Number(idnum)}).then((result, err) => {
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
var getPostAllCommands  = function ( idnum, callback) {
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
    console.log('id: ', idnum);
    mongo.posts.find({ 'userId' : Number(idnum)}).toArray(( err, result) => {
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

module.exports = {
    addPosts: addPosts,
    getAllPosts: getAllPosts,
    getOnePost: getOnePost,
    getPostAllCommands: getPostAllCommands,
    getPostAllUsers: getPostAllUsers,
};
