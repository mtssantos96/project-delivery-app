const jwt = require('jsonwebtoken');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const validate = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    
    // const token = authorization.split(' ')[1];

    const user = jwt.verify(
      authorization, 'secret_key',
      {
        expiresIn: '7d',
        algorithm: 'HS256',
      },
    );

    req.user = {
      id: user.id, name: user.name, role: user.role,
    };

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid or inexistent token.' });
  }
};

/**
 * @param {("administrator" | "seller" | "customer")[]} allowedRoles
 * @returns {validate} middleware
 */
const validateRole = (allowedRoles) => (req, res, next) => {
  if (allowedRoles && !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Acess denied.' });
  }

  next();
};

const authMiddleware = {
  validate,
  validateRole,
};

module.exports = authMiddleware;
