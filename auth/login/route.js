import express from 'express';
import {
    signInUser, 
} from './controller.js';


let UserRouter = express.Router()


function Router(){
    UserRouter.route('/')
        .post(signInUser)
    
    return UserRouter
}


export default Router()