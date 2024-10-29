import express from 'express'
import { deleteProducts, getProducts, postProducts, updateProducts } from '../controllers/productController.js'

const router = express.Router()

router.get('/', getProducts as any)
router.post('/', postProducts as any)
router.put('/', updateProducts as any)
router.delete('/:id', deleteProducts as any)

export default router