import express from 'express';
import {
    registerUser, 
} from './controller.js';


let UserRouter = express.Router()


function Router(){
    UserRouter.route('/register')
        .post(registerUser)
    
    return UserRouter
}


export default Router()