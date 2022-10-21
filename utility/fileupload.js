import multer from 'multer'
import {v2} from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();


const cloudi = () => {

    v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key : process.env.API_KEY,
        api_secret: process.env.API_SECRET
    })

    return v2

}


const fileUpload = () =>{
    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, 'uploads/')
        },
        filename: function(req, file, cb){
            cb(null, new Date() .toISOString().replace(/:/g, '-') + file.originalname)
        }
    })

    return storage
}

const fillter = () =>{
    const fileFilter = (req, file, cb) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true)
        }else{
            //we throw new Error(" here");
            cb(null, false);
        }
}

    return fileFilter
}


const picUpload = () => {
    let storage = fileUpload()
    let fileFilter = fillter()
    const upload = multer({storage, limits: {
            fileSize: 1024*1024 * 5,
        },
        fileFilter
        })


    return upload
}

export {picUpload, cloudi as v2}