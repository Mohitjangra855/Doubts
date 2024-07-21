// yat apan te cloud chi confilg save karu 
//cofigar mhanje jodna
const cloudinary = require('cloudinary').v2; //he package la require kele
const { CloudinaryStorage } = require('multer-storage-cloudinary'); //he package la require kele

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_API_SECRET
}) //he env.file la config means jodle tyala 

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'newdoubt', //hya folder asnar hya navacha
      allowerdFormats: ["png","jpg","jpeg"], // ha format madhe file takli jail form madhun   },
    },
    }); //cloudinary storage ahe yat file upload honar  he npm multer-storage-cloudinary package madhun ha code copy kela ani modify kela ahe 

    module.exports = {
        cloudinary,
        storage
    }