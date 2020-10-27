import jwt, { decode } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token
  // headersのauthorization keyにBearer tokenがsetされていたら
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      // ex. { id: '5f8eeb0f3dfd733a43255068', iat: 1603535852, exp: 1606127852 }
      // 不正なtokenでverfify失敗すると、JsonWebTokenError: invalid token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // mongoose select methodでpassword以外のfieldを取得、reqにuserをset
      req.user = await User.findById(decoded.id).select('-password')
      // 不正なtoken
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }
  // tokenなし
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
  next()
})

export { protect }
