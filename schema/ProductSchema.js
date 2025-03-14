import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  bestseller: { type: Boolean, default: true },
  images: [{ type: Array, required: true }], // Array of image URLs
  rating: {
    average: { type: Number, default: 0 }, // Average rating (e.g., 4.5)
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
        rating: { type: Number, required: true, min: 1, max: 5 }, // Rating from 1 to 5
        comment: { type: String }, // Optional review comment
        createdAt: { type: Date, default: Date.now }
      }
    ]
  }
}, { timestamps: true });

export const ProductSchema = mongoose.model("Product", productSchema);