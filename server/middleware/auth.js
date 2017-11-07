var cookieParser = require('./cookieParser.js');
const models = require('../models');
const Promise = require('bluebird');

// createSession(requestWithoutCookies, response, function() {
//   var session = requestWithoutCookies.session;
//   expect(session).to.exist;
//   expect(session).to.be.an('object');
//   expect(session.hash).to.exist;

module.exports.createSession = (req, res, next) => {
  if (req.header.cookie === undefined) {
    models.Sessions.create()
      // .then((session) => console.log('INSERT ID: ',  session.insertId))
      .then(({insertId}) => models.Sessions.get({id: insertId})
        )
      .then((session) => {
        req.session = session;
        res.cookies = {'shortlyid': session.hash};  //cookies['shortlyid']
        next();
      });
  } else if (cookies.shortlyid) {
    models.Sessions.get({hash: cookies.shortlyid})
      .then((session) => {
        req.session = session;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/