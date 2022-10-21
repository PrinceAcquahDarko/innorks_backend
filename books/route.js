import express from 'express';
import {getUserId} from '../auth/authorization.js'
import {
    createBook,
    deleteBook,
    getAllBooks,
    getBookById,
    updateBook
} from './controller.js';

import {picUpload} from '../utility/fileupload.js'

let BookRouter = express.Router()
const upload = picUpload();

function Router(){
    BookRouter.route('/')
        .get(getAllBooks)
        .post(getUserId,upload.single('Image'),createBook)
    
    BookRouter.route('/id')
        .get(getBookById)
        .put(getUserId, upload.single('Image'),updateBook)
        .delete(getUserId, deleteBook)
    

    return BookRouter
}


export default Router()
