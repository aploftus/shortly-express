const parseCookies = (req, res, next) => {
// this function shoud just parse req for cookies
  if (req.headers.cookie) {
    console.log(req.headers.cookie);
    
    var cookies = req.headers.cookie.split('; ');
    console.log('all cookies: ', cookies);
    req.cookies = {};
    cookies.forEach((cookie) => {
      cookie = cookie.split('=');
      req.cookies[cookie[0]] = cookie[1];  
    });
    console.log('request cookies object ');
    console.dir(req.cookies);
    next();
  }
};

module.exports = parseCookies;