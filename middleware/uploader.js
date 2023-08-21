const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "images/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "-" + file.originalname )
    }
})

const uploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /png|jpg|jpeg|JPG|webp/;
        const extension = path.extname(file.originalname);

        if (supportedImage.test(extension)) {
            cb(null, true);
        }
        else {
            cb(new Error("File must be a jpg / jpeg / png"))
        }
    },
    limits: {
        fileSize: 5000000,
    }

    /** 
     * for more filter please see the multer documentation
     * link: https://expressjs.com/en/resources/middleware/multer.html
     */
})

module.exports = uploader;