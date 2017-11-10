const parseCookies = (req, res, next) => {

  let cookieString = req.get('Cookie');

  parsedCookies = cookieString.split('; ').reduce((cookies, cookie) => {
    if (cookie) {
      parts = cookie.split('=');
      cookies[parts[0]] = parts[1];
    }
    return cookies;
  }, {});

  req.cookies = parsedCookies;
  next();
};

module.exports = parseCookies;