import {
    jwts, 
    comparePassword,
    payload
} from '../../utility/index.js'

import {con} from '../../utility/db.js'

const signInUser = async (req, res) => {
    const {email, password} = req.body
    try {
        let loginUser =  await con.query('SELECT * FROM bookusers WHERE email = $1', [email]);

        if (!loginUser) return res.status(404).send({ message:"No such user"});
       
        let validPassword = await comparePassword(password, loginUser.rows[0].password);
    
        if (!validPassword) return res.status(402).send({ message:"passwords dont much"});
    
        let token = jwts(loginUser.rows[0].id);

        const load = payload(token, loginUser.rows[0])

        return res
        .status(200)
        .json({ message: "loggedIn successfully", load });

    } catch (error) {
        return res
        .status(500)
        .json({ message: "could not log in User"});
    }

}


export {signInUser}