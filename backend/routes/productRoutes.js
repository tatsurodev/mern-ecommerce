import express from 'express'
import { getProducts, getProductById } from '../controllers/productController.js'

const router = express.Router()

// router.get('/', getProducts)は下記と同値
// router.route(path)は複数のmethodを追加できる ex.router.route(path).get().post().delete()
router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router
