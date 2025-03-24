import express from "express";
import { createProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct, ProductSearch } from '../controllers/ProductControlers.js'
import upload from "../Middleware/Multer.js";
import {ClientAuthorizationUser} from '../Middleware/auth.js'
const ProductRouting = express.Router();

ProductRouting.post('/', ClientAuthorizationUser, createProduct);
ProductRouting.get('', ClientAuthorizationUser, getAllProduct);
ProductRouting.get('/:id', ClientAuthorizationUser, getSingleProduct);
ProductRouting.patch('/:id', ClientAuthorizationUser, updateProduct);
ProductRouting.put('/:id', ClientAuthorizationUser, updateProduct);
ProductRouting.delete('/:id', ClientAuthorizationUser, deleteProduct);
ProductRouting.delete('/search', ClientAuthorizationUser, ProductSearch);

ProductRouting.post('/upload', upload.single('image'), createProduct)
ProductRouting.post('/upload', upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
]), createProduct)

export default ProductRouting;