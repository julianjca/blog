const User = require('../models/user');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');

module.exports = {
  create : function(req,res){
    User.create(req.body)
    .then(data=>{
      res.status(200).json({
        msg : "success registering user",
        data : data
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed registering user",
        err : err
      });
    });
  },

  login : function(req,res){
    User.findOne({
      email : req.body.email
    })
    .then(user=>{
      const isPasswordValid = bcrypt.compareSync(req.body.password,user.password);
      if(isPasswordValid){
        jwt.sign({
          email : user.email,
          name : user.name,
          id : user._id
        }, process.env.JWT_SECRET,( err,token )=>{
          if( err ){
            res.status( 500 ).json({
              msg : err.message
            });
          }
          else{
            res.status( 200 ).json({
              msg : 'login success',
              token : token
            });
          }
        });
      }

      else{
        res.status(403).json({
          msg : "failed logging in user",
          err : err
        });
      }
    })

    .catch(err=>{
      res.status(500).json({
        msg : "failed finding user",
        err : err
      });
    });
  },

  findAll : function(req,res){
    User.find({})
    .then(data=>{
      res.status( 200 ).json({
        msg : 'success finding users',
        data : data
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed finding user",
        err : err
      });
    });
  },

  remove : function(req,res){
    User.deleteOne({
      _id : req.params.id
    })
    .then(data=>{
      res.status( 200 ).json({
        msg : `success deleting user by id ${req.params.id}`,
        data : data
      });
    })
    .catch(err=>{
      res.status(500).json({
        msg : "failed deleting user",
        err : err
      });
    });
  }
};