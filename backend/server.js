import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
// es6 moduleでのfile importは拡張子必須
import products from './data/products.js'

// 環境変数の設定
dotenv.config()
const { NODE_ENV, PORT = 5000 } = process.env
connectDB()
const app = express()

// routing
app.get('/', (req, res) => {
  res.send('API is running...')
})
app.get('/api/products', (req, res) => {
  // json形式でresを返す
  res.json(products)
})
app.get('/api/products/:id', (req, res) => {
  // dynamic paramsには, req.params.paramNameでaccess
  const product = products.find(p => p._id === req.params.id)
  res.json(product)
})

app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`)
)