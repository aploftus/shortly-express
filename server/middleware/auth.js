var cookieParser = require('./cookieParser.js');
const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
// does the insert into session table with user ID and hash/cookie record
// Cookies come in on a header, call cookieParser
// if not cookie is on th req, we make a session with new cookie
  var cookie = req.shortlyCookie;
// if cookie is on the req, we make a session.

// Is the next just showing a page of links?

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

