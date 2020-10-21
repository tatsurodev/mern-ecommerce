import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find({})
  // json形式でresを返す
  res.json(products)
}))

// @desc    Fetch single product
// @route   GET /api/product/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
  // dynamic paramsには, req.params.paramNameでaccess
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
}))

export default router
