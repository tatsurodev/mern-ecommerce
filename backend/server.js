// backendはexpressなので、CommonJs syntaxを使用
const express = require('express')
const products = require('./data/products')

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

app.listen(5000, console.log('Server runnig on port 5000'))