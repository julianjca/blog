process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let User = require('../models/user');

//Chai
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
let chaiHttp = require('chai-http');
let server = require('../app.js');
chai.use(chaiHttp);

describe('Users', () => {
  beforeEach(() => {
    User.create({
      name : "Tono",

    })
    .then(data=>{
      //console.log(data);
    })
    .catch(err=>{
      console.log(err);
    });
  });
  describe('/GET showing all users', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/users')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('array');
            // res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  afterEach((done) => { //Before each test we empty the database
    User.remove({}, (err) => {
       done();
    });
  });
});