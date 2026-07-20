const {v2: cloudinary} = require('cloudinary');


cloudinary.config({
    cloud_name: process.env.cloudinary_Name,
    api_key: process.env.cloudinary_API_key,
    api_secret: process.env.cloudinary_Secret_key
});



module.exports = {
    cloudinary
}
