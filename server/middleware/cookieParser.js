const parseCookies = (req, res, next) => {
  if (req.headers.cookie !== undefined) {
    var cookies = req.headers.cookie.split('; ');
    req.cookies = {};
    cookies.forEach((cookie) => {
      cookie = cookie.split('=');
      req.cookies[cookie[0]] = cookie[1];
    });
    next();
  } else {
    next();
  }
};

module.exports = parseCookies;