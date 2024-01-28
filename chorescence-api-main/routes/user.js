/* -------Express------*/
const express = require('express');

const router = express.Router();
router.use(express.json());

// Getting local data from file
var data = require('../util/data.js');

var users = data.users;

//connect to database
const {Pool} = require('pg');
const pool = new Pool({
 connectionString: "postgres://rzwobxhlwzhhyx:825b7a198e09b17b0c45a0923deafb11b79f460b480ec6dcabdf5c191dae5c8f@ec2-52-87-107-83.compute-1.amazonaws.com:5432/d7peu38fmv9msn",
 ssl: {
 rejectUnauthorized: false
 }
});


/**
 * @swagger
 * /user/?id=:
 *   get:
 *     summary: Retrieve a specified user
 *     description: Takes in a user ID and returns the data for that user
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Returns user info
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 *
*/
router.get('/', (req, res) => {
  const userid = req.query.id;
  if (!userid) {
    res.status(400).send({ error: 'Bad Request - No parameters' });
  }
  else{
    //Get USER info
    query = `SELECT id, username, fname, lname, email, groups FROM public.users WHERE id::text = '` + userid + `';`;
    pool.query(query, (err, response) => {
      if(err){
        console.log("Error - Failed to select all from groups");
        res.sendStatus(500);
      }
      else{
        console.log(response.rows);
        response.rows.length != 0 ? res.status(200).json(response.rows[0]) : res.sendStatus(404);
      }
    });
  }
  
});

/**
 * @swagger
 * paths:
 *   /user/create:
 *     post:
 *       summary: Create a new user
 *       description: Takes in user data and creates a new user 
 *       consumes:
 *         - application/json
 *       parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         type: object
 *         description: all that data
 *       responses:
 *         200:
 *           description: Successfully created a User
 *         400:
 *           description: Bad Request
*/
router.post('/create', (req, res) => {
  const data = req.body;
  console.log("We got", data);
  //Bad request if missing either parameters
  if (!data.hasOwnProperty("username") || !data.hasOwnProperty("email") || !data.hasOwnProperty("password") || !data.hasOwnProperty("fname") || !data.hasOwnProperty("lname")) {
    res.status(400).send({ error: 'Bad Request' });
  }else{
    //Add group to database
  query = `INSERT INTO public.users(username, fname, lname, email, password, groups) VALUES ($1, $2, $3, $4, $5, $6);`;
  pool.query(query, [data.username, data.fname, data.lname, decodeURIComponent(data.email), data.password, '{}'], (err, response) => {
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
});
// /**
//  * @swagger
//  * /user:
//  *   patch:
//  *     summary: Update the specified user profile
//  *     description: Takes in user ID and updates the data for that user
//  *     parameters:
//  *       - name: id
//  *         in: query
//  *         required: true
//  *         type: integer
//  *         description: User ID
//  *     responses:
//  *       200:
//  *         description: Updates User Info
//  *       404:
//  *         description: Not Found
//  *       400:
//  *         description: Bad Request
//  *
// */
// router.patch('/', (req, res) => {
//   const userid = req.query.id;
//   if (!userid) {
//     res.status(400).send({ error: 'Bad Request - No User ID' });
//   }
//   // Get data for a group
//   const user = users.find((item) => item.id == userid);

//   // insert code to update
//   user ? res.status(200).json({ message: `Updated ${user.id}` }) : res.sendStatus(404);
// });


/**
 * @swagger
 * /user/groups/?id=:
 *   get:
 *     summary: Retrieve groups for a user 
 *     description: Takes in a user ID and returns all the groups the user is in
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Returns group info
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 *
*/
router.get('/groups', (req, res) => {
  const userid = req.query.id;
  if (!userid) {
    res.status(400).send({ error: 'Bad Request - No parameters' });
  }else{
     //Get USER info
  query = `SELECT * FROM public.groups WHERE '${userid}'=ANY(admins) OR '${userid}'=ANY(members);`;
  pool.query(query, (err, response) => {
    if(err){
      // console.log("Error - Failed to select groups");
      res.sendStatus(500);
    }
    else{
      console.log(response.rows);
      response.rows.length != 0 ? res.status(200).json(response.rows) : res.sendStatus(404);
    }
  });
  }
});

// how to export in Express
module.exports = router;
