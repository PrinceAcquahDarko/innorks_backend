import joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 

const SECRET = process.env.SECRET;


const validateInputs = (data) => {
    const schema = joi.object({
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().min(6).required(),
      });

    const options = {
        errors:{
            wrap:{
                label :''
            }
        }
    }
  
      let validData = schema.validate(data, options);
      return validData;
}


const formatData = (data) => {
    return {
        firstname: data.firstname,
        email: data.email,
        lastname: data.lastname,
        password: hashPassword(data.password),
      };
}

const hashPassword = (password) => {
   return bcrypt.hashSync(password, 8)
}

const comparePassword = async (loggedInPassword, dbPassword) => {
   let result = await bcrypt.compare(
        loggedInPassword,
        dbPassword
    );

    return result
}

const jwts = (id) => {
    let token = jwt.sign({ id }, SECRET);
    return token;
}

const validateBookInputs = (book) => {
    const options = {
        errors:{
            wrap:{
                label :''
            }
        }
    }
    const schema = joi.object({
        title: joi.string().required(),
        author: joi.string().required(),
        category: joi.string().required(),
        Image: joi.required(),
      });
  
      let validData = schema.validate(book, options);
      return validData;
}

const payload =  (token, data) => {
    return {
        token: token,
        firstname: data.firstname,
        lastname: data.lastname,
    }
}


export {
    formatData, 
    validateInputs,
    jwts, 
    comparePassword, 
    validateBookInputs,
    hashPassword,
    payload
}