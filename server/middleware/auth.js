const db = require('../db');
var cookieParser = require('./cookieParser.js');
const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (req.cookies && req.cookies.shortlyid) {
    models.Sessions.get({hash: req.cookies.shortlyid})
      .then((session) => {
        if (session) {
          req.session = session;
          res.cookies = {'shortlyid': {value: session.hash}};          
          next();
        } else {
          models.Sessions.create()
          .then(({insertId}) => models.Sessions.get({id: insertId})
            )
          .then((session) => {
            req.session = session;
            res.cookies = {'shortlyid': {value: session.hash}};
            next();
          });          
        }

      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    models.Sessions.create()
      .then(({insertId}) => models.Sessions.get({id: insertId})
        )
      .then((session) => {
        req.session = session;
        res.cookies = {'shortlyid': {value: session.hash}};
        next();
      });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

// TODO: helper method
// req, res, next
// module.exports.newSessionCreate = (req, res, next) => {
// };