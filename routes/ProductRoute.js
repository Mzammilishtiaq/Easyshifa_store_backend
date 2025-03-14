import express from "express";
import { createProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct,ProductSearch } from '../controllers/ProductControlers.js'
import upload from "../Middleware/Multer.js";
const ProductRouting = express.Router();

ProductRouting.post('/', createProduct);
ProductRouting.get('', getAllProduct);
ProductRouting.get('/:id', getSingleProduct);
ProductRouting.patch('/:id',updateProduct);
ProductRouting.put('/:id',updateProduct);
ProductRouting.delete('/:id', deleteProduct);
ProductRouting.delete('/search', ProductSearch);

ProductRouting.post('/upload', upload.single('image'), createProduct)
ProductRouting.post('/upload', upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
]), createProduct)

export default ProductRouting;