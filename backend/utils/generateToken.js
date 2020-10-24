import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  // sign(payload, secretKey, option)
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )
}

export default generateToken