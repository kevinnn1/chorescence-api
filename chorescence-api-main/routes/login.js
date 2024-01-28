/* -------Express------*/
const express = require('express');

const router = express.Router();
//connect to database
const {Pool} = require('pg');
const e = require('express');
const pool = new Pool({
 connectionString: "postgres://rzwobxhlwzhhyx:825b7a198e09b17b0c45a0923deafb11b79f460b480ec6dcabdf5c191dae5c8f@ec2-52-87-107-83.compute-1.amazonaws.com:5432/d7peu38fmv9msn",
 ssl: {
 rejectUnauthorized: false
 }
});
/**
 * @swagger
 * /login/?email=&password=:
 *   get:
 *     summary: Log in
 *     description: Takes in username/password, retrieves user's data
 *     parameters:
 *       - name: email
 *         in: query
 *         required: true
 *         type: string
 *         description: email
 *       - name: password
 *         in: query
 *         required: true
 *         type: string
 *         description: password
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 *
*/
router.get('/', (req, res) => {
    const email = req.query.email;
    const password = req.query.password;

    if(!password || !email){
        res.sendStatus(400);
    }else{
      query = `SELECT id, username, fname, lname, email, groups FROM public.users WHERE email = $1 AND password = $2;`;
      pool.query(query, [decodeURIComponent(email), password], (err, response) => { 
      if(err){
        console.log(err, "Error - Failed to authenticate");
        res.sendStatus(500);
      }
      else{
        console.log(response.rows);
        response.rows.length != 0 ? res.status(200).json(response.rows[0]) : res.sendStatus(404);
      }
    }); 
  }
  }
)

// how to export in Express
module.exports = router;