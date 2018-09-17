const Comment = require('../models/comment');
const mongodb = require('mongodb');
const User = require('../models/user');


module.exports = {
  create : function(req,res){
    const input = {
      title : req.body.title,
      body : req.body.body,
      user : req.userData.id
    };
    Comment.create(input)
    .then(data=>{
      User.updateOne({
        _id : data.user
      },{
        $push : {
          comments : data._id
        }
      })
      .then(response=>{
        res.status(200).json({
          msg : "success adding article",
          data : data
        });
      })
      .catch(err=>{
        res.status(500).json({
          msg : "failed adding article",
          err : err
        });
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed adding article",
        err : err
      });
    });
  },

  remove : function(req,res){
    Comment.findOne({
      _id : req.params.id
    })
    .then(data=>{
      data.remove();
      res.status( 200 ).json({
        msg : `success deleting article by id ${req.params.id}`,
        data : data
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed deleting article",
        err : err
      });
    });
  },

  update : function(req,res){
    Comment.findOne({
      _id : req.params.id
    })
    .then(data=>{
      User.updateOne({
        _id : req.params.id
      },{$set: {
        title : req.body.title || data.title,
        body : req.body.body || data.body,
      }})
      .then(data=>{
        res.status( 200 ).json({
        msg : `success updating article by id ${req.params.id}`,
        data : data
      });
      })
      .catch(err=>{
        res.status(500).json({
          msg : "failed updating article",
          err : err
        });
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed deleting article",
        err : err
      });
    });
  },

  findAll : function(req,res){
    Comment.find({})
    .populate('users')
    .exec()
    .then(data=>{
      res.status( 200 ).json({
        msg : 'success finding article',
        data : data
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed finding article",
        err : err
      });
    });
  }
};