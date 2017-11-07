const parseCookies = (req, res, next) => {
// this function shoud just parse req for cookies
  if (req.headers.cookie) {    
    var cookies = req.headers.cookie.split('; ');
    req.cookies = {};
    cookies.forEach((cookie) => {
      cookie = cookie.split('=');
      req.cookies[cookie[0]] = cookie[1];  
    });
    next();
  }
};

module.exports = parseCookies;