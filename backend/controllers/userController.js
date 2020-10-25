import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   Post /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   Post /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  // register前に重複check
  if (userExists) {
    res.status(400)
    throw new Error('User alread exists')
  }
  // user作成, _id, tokenは自動、isAdminはdefault値が使用される
  const user = await User.create({ name, email, password })
  // return response
  if (user) {
    const { _id, name, email, isAdmin } = user
    const token = generateToken(_id)
    res.status(201).json({ _id, name, email, isAdmin, token })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  /* brad's way, middlewareでuser modelからuserを既に取得しているので更にcontrollerで取得するのは冗長
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
  */
  if (!req.user) {
    res.status(404)
    throw new Error('User not found')
  }
  const { _id, name, email, isAdmin } = req.user
  res.json({ _id, name, email, isAdmin })
})

export { authUser, registerUser, getUserProfile }