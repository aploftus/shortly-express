const parseCookies = (req, res, next) => {
// this function shoud just parse req for cookies
  if (req.headers.cookie) {
    console.log(req.headers.cookie);
    
    var cookies = req.headers.cookie.split('; ');
    console.log(cookies);
    cookies.forEach((cookie) => {
      cookie.split('=');
      
      if (cookie[0] === 'shortlyid') {
        req.shortlyCookie = {shortlyid: cookie[1]};
        next();
      }
    });
    next();
  }
};

module.exports = parseCookies;