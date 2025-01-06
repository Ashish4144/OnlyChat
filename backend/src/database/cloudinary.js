import {v2 as cloudinary} from "cloudinary";

import {config} from "dotenv";

config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY, ///ERROR SECRET_KEY name should be as per .env file 
});

export default cloudinary;