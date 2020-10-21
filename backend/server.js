import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import colors from 'colors'
// es6 moduleでのfile importは拡張子必須
import productRoutes from './routes/productRoutes.js'

// 環境変数の設定
dotenv.config()
const { NODE_ENV, PORT = 5000 } = process.env
connectDB()
const app = express()

// routing
app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)

app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold)
)