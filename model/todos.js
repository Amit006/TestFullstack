"use strict";
var guid = require('guid');
var ObjectId = require('mongodb').ObjectID;
var mongo = require('./mongo');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var addtodos = function (todos, callback) {
    console.log(' todos: addtodos ', todos);

    mongo.licence.findOne({ _id: todos._id}).then( ( resData, errfind) => {
        // console.log(' todos.Order_Number: ', todos._id, ' resData: ', resData, ' errfind: ', errfind);

        if (errfind) {
            return callback({ msg: "Some Error Ocurred FindLicence "}, null);;
        }

        if(resData){
            console.log(' from here');
            callback({msg: " Licence already exist.", Product_Key: resData.Product_Key} , null);
        } else {
            console.log(' Licence: ---', todos);
            mongo.licence.insertOne(todos.data, function (err, data) {
                console.log(' err: ', err, ' result-data: ', data.ops[0]);

                if (err) {
                    return callback({msg: ' Error Occurred  '+ err.message }, null);
                }

                callback(null,{ n: data.result.n, insertedCount: data.insertedCount , ops: data.ops[0]});
            });
        }
    });
};
var gettodos = function (Onum, callback) {
    // if (ObjectId.isValid(todosId) === false) {
    //     var error = new Error("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
    //     error.status = 500;
    //     callback(error);
    //     var error = new Error("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
    //     error.status = 500;
    //     callback(error);
    //     return;
    // }
    // console.log(' ONum: ', Onum)
    mongo.licence.findOne({ "Order_Number": Onum.Order_Number }, function (err, result) {
        if (err) {
            callback(err);
            return;
        }
        if (result === null) {
            var error = new Error("No todos Found. One Requested.");
            error.status = 404;
            callback(error);
            return;
        }
        console.log(' From Mongo Api: ', result);
        callback(null, result);
    });
};

module.exports = {
    addtodos: addtodos,
    gettodos: gettodos,
};
