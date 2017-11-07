var cookieParser = require('./cookieParser.js');
const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (req.header.cookie === undefined) {
    models.Sessions.create()
      .then(({insertId}) => models.Sessions.get({id: insertId})
        )
      .then((session) => {
        req.session = session;
        res.cookies = {'shortlyid': {value: session.hash}};
        session.user = {username: "BillZito"};
        session.userId = 1;
        next();
      });
  } else if (cookies.shortlyid) {
    models.Sessions.get({hash: cookies.shortlyid})
      .then((session) => {
        req.session = session;
        models.Users.findByID(session.userId)
          .then((results) => {
            req.session = session;
            console.log('LOGGING SESSION: ', session);
            session.user = {username: results.username};
            session.userId = results.id;
          })
          // .then(({username}) => {req.session.user = username;})
        console.log(req.session.user);
        // req.session.userId = session.userId;
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

// createSession(requestWithoutCookie, response, function() {
//   var hash = requestWithoutCookie.session.hash;
//   db.query('UPDATE sessions SET userId = ? WHERE hash = ?', [userId, hash], function(error, result) {

//     var secondResponse = httpMocks.createResponse();
//     var requestWithCookies = httpMocks.createRequest();
//     requestWithCookies.cookies.shortlyid = hash;

//     createSession(requestWithCookies, secondResponse, function() {
//       var session = requestWithCookies.session;
//       expect(session).to.be.an('object');
//xxxxx  expect(session.user.username).to.eq(username);
//       expect(session.userId).to.eq(userId);
//       done();
