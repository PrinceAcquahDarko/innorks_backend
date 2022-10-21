import {
    validateInputs,
    jwts, 
    hashPassword,
    payload
} from '../../utility/index.js'

import {con} from '../../utility/db.js'


const registerUser = async(req, res) => {
    let data = {...req.body}

    let validData = validateInputs(data);
    if (validData.error) return res.status(300).send({ message:validData.error?.details[0].message})

 
    try {
        const connection = await con.connect()

        let registerUser =  await connection.query('SELECT * FROM bookusers WHERE email = $1', [data.email]);

        if (registerUser.rows.length) return res.status(404).send({ message:"user already exists"});
     
        data.password = hashPassword(data.password);
        
        let user = await connection.query('INSERT INTO bookusers (firstname, lastname,email, password) VALUES ($1,$2,$3,$4) RETURNING *', [data.firstname, data.lastname, data.email, data.password])
        let token = jwts(user.rows[0].id);

        const load = payload(token, user.rows[0])
        
        res
        .status(200)
        .json({ message: "registered successfully", load });

        connection.release()

    } catch (error) {
        return res
        .status(500)
        .json({ message: "could not register User"});
    }
    
}


export {
    registerUser, 
}