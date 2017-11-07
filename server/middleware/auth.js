var cookieParser = require('./cookieParser.js');
const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  var cookies = req.cookies;
  // console.log('cookie inside createSEssion: ', cookie);
  var userId = req.userId;
  
  if (cookies.shortlyid) {
    models.Sessions.get({hash: cookies.shortlyid})
      .then((session) => {
        req.session = session;
        console.log('returnting session: ', session);
        res.redirect('/');
      });
  } else {
    
  }

// if cookie is on the req, we make a session.

// Is the next just showing a page of links?

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

