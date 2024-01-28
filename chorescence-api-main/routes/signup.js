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
 * /signup/?username=&email=&password=&fname=&lname=:
 *   post:
 *     summary: Sign Up
 *     description: Takes in username, email, password, name, creates user
 *     parameters:
 *       - name: username
 *         in: query
 *         required: true
 *         type: string
 *         description: username
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
 *       - name: fname
 *         in: query
 *         required: true
 *         type: string
 *         description: first name
 *       - name: lname
 *         in: query
 *         required: true
 *         type: string
 *         description: last name
 *     responses:
 *       200:
 *         description: Successfully created user
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 *
*/
router.post('/', (req, res) => {
    const email = req.query.email;
    const username = req.query.username;
    const password = req.query.password;
    const fname = req.query.fname;
    const lname = req.query.lname;

    console.log(email);
    if(!email || !username || !password || !fname || !lname){
        res.sendStatus(400);
    }else{
      query = `INSERT INTO public.users(username, fname, lname, email, password, groups) VALUES ($1, $2, $3, $4, $5, '{}');`;
      pool.query(query, [username, fname, lname, decodeURIComponent(email), password], (err, response) => { 
      if(err){
        console.log(err, "Error - Failed to create user");
        res.sendStatus(500);
      }
      else{
        console.log(response.rows);
        res.sendStatus(201);
      }
    }); 
  }
  }
)

// how to export in Express
module.exports = router;