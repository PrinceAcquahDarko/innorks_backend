import { con } from "../utility/db.js";
import {v2} from '../utility/fileupload.js'

const getAllBooks = async(req, res) => {
    try {
        let allBooks = await con.query('SELECT * FROM books ORDER BY id ASC');
        console.log(allBooks.rows[0])
        return res
        .status(200)
        .json({"message":"success", "allbooks":allBooks.rows})

    } catch (error) {
         return res
        .status(500)
        .json({ message: "could not get Books"});
    }
}

const getBookById = async(req, res) => {
    try {
        let book = await con.query('SELECT * FROM books WHERE id = $1', [+req.query.bookId]);
        return res
        .status(200)
        .json({"message":"success", "book":book.rows[0]})

    } catch (error) {
         return res
        .status(500)
        .json({ message: "could not get Book"});
    }
}

const createBook = async(req, res) => {
    let data = { ...req.body };

    try {
        let cloudi = v2()
        let response = await cloudi.uploader.upload(req.file.path, {resource_type:"auto"})
        data.link = response.secure_url
        console.log(response);
        console.log(data.link)

        let book = await con.query('INSERT INTO books (title, author,link, category) VALUES ($1,$2,$3,$4) RETURNING *',
         [data.title, data.author, data.link, data.category])
        return res
        .status(200)
        .json({ message: "created successfully", "book":book.rows[0]});

    } catch (error) {
        return res
        .status(500)
        .json({ message: "could not create Book"});
    }
}

const updateBook = async(req, res) => {
     if(req.file){
        let cloudi = v2()
        let response = await cloudi.uploader.upload(req.file.path, {resource_type:"auto"})
        req.body.link = response.secure_url
    }
    const {title, author, category,link} = req.body
    let update;
    try {
        if(link){
             update = await con.query(
                'UPDATE books SET title = $1, author = $2, category = $3, link = $4 WHERE id = $5',
            [title, author, category,link, +req.query.bookId])
            console.log(update)

        }else{
             update = await con.query(
                'UPDATE books SET title = $1, author = $2, category = $3WHERE id = $4',
            [title, author, category, +req.query.bookId])
            console.log(update)
        }
        
        
        return res
        .status(200)
        .send({ message: 'updated successfully', book: update.rows[0]});

        
    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ message: "could not update Book"});
    }
}

const deleteBook = async(req, res) => {
    try {
        await con.query('DELETE FROM books WHERE id = $1', [+req.query.bookId])
        return res
        .status(200)
        .json({"message":"deleted successfully"});

    } catch (error) {
        return res
        .status(500)
        .json({ message: "could not delete Book"});
    }
}


export{
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    createBook,
}


