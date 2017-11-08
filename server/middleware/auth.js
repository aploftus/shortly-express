const db = require('../db');
var cookieParser = require('./cookieParser.js');
const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (req.cookies) {
    models.Sessions.get({hash: req.cookies.shortlyid})
      .then((session) => {
        if (session) {
          req.session = session;
          res.cookies = {'shortlyid': {value: session.hash}};
          res.cookie('value', session.hash);
          res.set('Set-Cookie', `shortlyid=${session.hash}`);
          next();
        } else {
          models.Sessions.create()
          .then(({insertId}) => models.Sessions.get({id: insertId})
            )
          .then((session) => {
            req.session = session;
            res.cookies = {'shortlyid': {value: session.hash}};
            res.cookie('value', session.hash);
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
        res.cookie('value', session.hash);
        next();
      });
  }
};