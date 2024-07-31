require('dotenv').config()
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const white_list = ["/", "/login", "/register"]

  if (white_list.find(item => '/v1/api' + item === req.originalUrl)) {
    next()
  } else {
    if (req?.headers?.authorization?.split(' ')?.[1]) {
      const token = req.headers.authorization.split(' ')[1]

      // verify
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log('🚀 ~ auth ~ decoded:', decoded)
        next()
      } catch (error) {
        return res.status(401).json({
          message: " Token expired/ Invalid token"
        })
      }
    } else {
      // return exception
      return res.status(401).json({
        message: "Access token not transmitted/ Token expired"
      })
    }
  }
}

module.exports = auth
