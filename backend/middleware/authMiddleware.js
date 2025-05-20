const { users } = require('../data/store');

/**
 * Protect routes using HTTP Basic Authentication
 */
const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic');
    return res.status(401).json({ message: 'Missing Authorization header' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    res.setHeader('WWW-Authenticate', 'Basic');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  req.user = { username: user.username, name: user.name, role: user.role };
  next();
};

module.exports = { isAuthenticated }; 