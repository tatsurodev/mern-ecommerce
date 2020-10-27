import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import colors from 'colors'
// es6 moduleでのfile importは拡張子必須
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// 環境変数の設定
dotenv.config()
const { NODE_ENV, PORT = 5000 } = process.env
connectDB()
const app = express()
// bodyのjson dataをacceptできるようにする
app.use(express.json())

// routing
app.get('/', (req, res) => {
  res.send('API is running...')
})
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
// 404 not found
app.use(notFound)
// error handlerでerror時の処理を記述、全routingの後に設定
app.use(errorHandler)

app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold)
)
