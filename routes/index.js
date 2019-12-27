var express = require('express');
var router = express.Router();
var posts = require("../model/posts");
var comments = require("../model/comments");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', function(req, res, next) {

  var query = require('url').parse(req.url,true).query;
  var userId = query.userId;
  if(userId) {
    posts.getPostAllUsers(userId,( err, resultData) => {
      console.log(' result', resultData);
      res.json(resultData);
    });
  } else {
    posts.getAllPosts(( err, resultData) => {
      console.log(' result', resultData);
      res.json(resultData);
    });
  }
});
router.get('/posts/:id', function(req, res, next) {
  posts.getOnePost(req.params.id, ( err, resultData) => {
    console.log(' result', resultData);
    res.json(resultData);
  });

});
router.get('/posts/:id/comments', function(req, res, next) {
  posts.getPostAllCommands(req.params.id, ( err, resultData) => {
    console.log(' result', resultData);
    res.json(resultData);
  });

});
router.get('/comments', function(req, res, next) {
  var query = require('url').parse(req.url,true).query;
  var postId = query.postId;
   if(postId){
    comments.getAllCommentsWithPostId( postId, (err, resultData) =>{
      console.log(' result', resultData);
      res.json(resultData);
    })
   } else
  res.render('index', { title: 'Express' });
});
router.get('/albums', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/photos', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/todos', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/users', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
