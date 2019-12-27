var express = require('express');
var router = express.Router();
var posts = require("../model/posts");
var comments = require("../model/comments");
let Validator = require('validatorjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', function(req, res, next) {

  var query = require('url').parse(req.url,true).query;
  var userId = query.userId;
  if(userId) {
    posts.getPostAllUsers(userId,( err, resultData) => {
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
    res.json(resultData);
  });

});
router.get('/posts/:id/comments', function(req, res, next) {
  posts.getPostAllCommands(req.params.id, ( err, resultData) => {
    res.json(resultData);
  });

});

router.post("/posts", function (req, res, next) {
  var BodyObj = {
    title: req.body.title,
    body: req.body.body,
    userId: Number(req.body.userId)
  };
  let rules = {
    id: 'required',
    title: 'required',
    body: 'required',
    userId: 'required',
  };
  let validation = new Validator(BodyObj, rules);
  if(validation.passes()){
    posts.addPosts(BodyObj, (err, result) =>{
      res.json(result);
    })
  } else {
    res.json(' Please Spacify All The Paramiter')
  }

});
router.put("/posts/:id", function (req, res, next) {
  var obj = JSON.parse(JSON.stringify(req.body));
  var postId  = Number(req.params.id);
  var BodyObj = {
    id: Number(obj.id),
    title: obj.title,
    body: obj.body,
    userId: Number(obj.userId)
  };
  let rules = {
    id: 'required',
    title: 'required',
    body: 'required',
    userId: 'required',
  };
  let validation = new Validator(BodyObj, rules);
  if(validation.passes()){
    posts.updatePosts({
      'id': postId
    },{
      id: Number(obj.id),
      title: obj.title,
      body: obj.body,
      userId: Number(obj.userId)
    }, (err, result) =>{
      res.json(result);
    })
  } else{
    res.json(" Please provide all value");
  }

});
router.patch("/posts/:id", function (req, res, next) {
  var obj = JSON.parse(JSON.stringify(req.body));
  console.log(' Obj: ', obj);
  var postId  = Number(req.params.id);
  var BodyObj = {
    title: obj.title
  };

  let rules = {
    title: 'required'
  };
  let validation = new Validator(BodyObj, rules);
  if(validation.passes()){
    posts.updatePostsPatch({
      'id': postId
    },{
      title: obj.title,
    }, (err, result) =>{
      res.json(result);
    })
  } else {
    res.json(' Please Provide title Value')
  }


});
router.delete("/posts/:id", function (req, res, next) {
  var obj = JSON.parse(JSON.stringify(req.body));
  console.log(' Obj: ', obj);
  var postId  = Number(req.params.id);
  posts.updatePostsDelete({
    'id': postId
  },{
    status: true,
  }, (err, result) =>{
    res.json(result);
  })
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
