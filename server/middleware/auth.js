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
      })
      .catch((err) => { // if the get fails we need to catch the error
        console.log(err);
      });
      
  } else {
    // no cookie, create a cookie with hashUtils.
    models.Sessions.create()
      .then((hash) => {
        req.session = hash; 
        // How does this have the user ID to insert the session??
        // set response headers to return this cookie
        res.headers = {cookie: hash};     
        // redirect to /
        res.redirect('/');
      });
  }

// if cookie is on the req, we make a session.

// Is the next just showing a page of links?

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/