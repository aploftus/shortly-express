const db = require('../db');
var cookieParser = require('./cookieParser.js');
const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (req.cookies && req.cookies.shortlyid) { // is the hash
    models.Sessions.get({hash: req.cookies.shortlyid})
      .then((session) => {
        req.session = session;
        res.cookies = {'shortlyid': {value: session.hash}};
        
        next();

      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    db.query('select * from users', (err, results) => {
      err && console.log(err);
      console.log('insert users table: ', results);
    });
    models.Sessions.create()
      .then(({insertId}) => models.Sessions.get({id: insertId})
        )
      .then((session) => {
        req.session = session;
        res.cookies = {'shortlyid': {value: session.hash}};
        // req.session.user = 'BillZito';
        // req.session.userId = 1;
        next();
      });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
