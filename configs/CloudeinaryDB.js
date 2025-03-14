import Cloudnary from 'cloudinary';
import Dotenv from 'dotenv';

Dotenv.config();

const Cloudinaryconnect = async () => {
    await Cloudnary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log('Cloudinary Connect')
}



export default Cloudinaryconnect;