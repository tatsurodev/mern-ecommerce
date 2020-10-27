// seederはapplicationの一部ではなく(server.js等にimportされるのではない)、単独で実行される(node seeder)ので, dotenv, db系の設定を行う必要あり
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    // import前に全data削除
    // deleteManyの引数なしで全削除
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    // seeder作成
    // user's seeder
    const createdUsers = await User.insertMany(users)
    // admin userの_id格納
    const adminUser = createdUsers[0]._id
    // productsをadmin userと紐付け
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      }
    })
    // product's seeder
    await Product.insertMany(sampleProducts)
    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// flagの有無によってimportかdestroyか処理を分岐させる
// node backend/seeder -> importData()
// node backend / seeder - d ->destroyData()
// process.argv[index]でcommand line引数を取得できる
// process.argv[0] -> node, process.argv[1] -> backend/seeder, process.argv[2] -> -d

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
