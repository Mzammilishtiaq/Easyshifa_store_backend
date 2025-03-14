import { ProductSchema } from '../schema/ProductSchema.js';
import { v2 as cloudinary } from 'cloudinary';

export const createProduct = async (req, res) => {
    const { name, description, price, category, bestseller } = req.body;
    const images = req.files;
    const imageUrls = [];

    if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            const path = images[i].path;
            const result = await cloudinary.uploader.upload(path, {
                resource_type: "image",
            });
            imageUrls.push(result.secure_url);
        }
    }

    const product = new ProductSchema({
        name,
        description,
        price,
        category,
        bestseller,
        images: imageUrls,
    });
    try {
        const image1 = req.files && req.files.image1 ? req.files.image1[0] : null;
        const image2 = req.files && req.files.image2 ? req.files.image2[0] : null;
        const image3 = req.files && req.files.image3 ? req.files.image3[0] : null;
        const image4 = req.files && req.files.image4 ? req.files.image4[0] : null;

        const images = [image1, image2, image3, image4].filter((item) => item !== null);
        const ImageUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        )
        const product = new ProductSchema({
            ...req.body,
            images: ImageUrl
        });

        await product.save();
        res.status(201).json({ message: "Product created", Data: product });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const { category } = req.query;
        const products = category ? await ProductSchema.find({ category: category }) : await ProductSchema.find({});
        res.status(200).json({ message: "Product fetched", Data: products, count: products.length });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.params.id);
        res.status(200).json({ message: "Product fetched", Data: product });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await ProductSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Product updated", Data: product });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await ProductSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted", Data: product });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


export const ProductSearch = async (req, res) => {
    try {
        const { search } = req.query;
        const products = await ProductSchema.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ],
        });
        res.status(200).json({ message: "Product fetched", Data: products });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}