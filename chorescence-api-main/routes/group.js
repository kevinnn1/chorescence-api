/* -------Express------*/
const express = require('express');

const router = express.Router();

router.use(express.json());

// Getting local data from file
var data = require('../util/data.js');

var groups = data.groups;

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
 * /group/?id=:
 *   get:
 *     summary: Retrieve group data
 *     description: Takes in a group ID and returns the data for that group
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         type: integer
 *         description: Group ID
 *     responses:
 *       200:
 *         description: Returns group info
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 *
*/
router.get('/', (req, res) => {
  // console.log(groups);
  const groupid = req.query.id;
  if (!groupid) {
    res.status(400).send({ error: 'Bad Request - No Group ID' });
  }else{
      // Get data for a group
  query = `SELECT * FROM groups WHERE id::text = '` + groupid + `';`;
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
 *   /group/create/?data=:
 *     post:
 *       summary: Create a new group
 *       description: Takes in a user ID/name and creates a new group with that user as an admin
 *       consumes:
 *         - application/json
 *       parameters:
 *       - name: data
 *         in: body
 *         type: object
 *         description: data to be added
 *         properties:
 *           groupName:
 *             type: string
 *           userId:
 *             type: string
 *         required:
 *           - groupname
 *           - userid
 *       responses:
 *         200:
 *           description: Successfully created a group
 *         400:
 *           description: Bad Request
*/

router.post('/create', (req, res) => {
  const data = req.body;
  console.log("We got", data);
  //Bad request if missing either parameters
  if (!data.hasOwnProperty("userId") || !data.hasOwnProperty("groupName")) {
    res.status(400).send({ error: 'Bad Request - Missing Parameters' });
  }
  else {
    //Add group to database
  query = `INSERT INTO public.groups(name, admins, members) VALUES ($1, '{${data.userId}}', '{}') RETURNING id;`;
  pool.query(query, [data.groupName], (err, response) => {
    if(err){
      console.log(err, "Error - Failed to create group");
      res.sendStatus(500);
    }
    else{
      console.log(response.rows);
      res.status(201).send(response.rows[0]);
    }
  });
  }
});

// /**
//  * @swagger
//  * /group/update/?id=:
//  *   patch:
//  *     summary: Update group information
//  *     description: Takes in a group id/parameters and updates that group with requested edits.
//  *       Specifically NOT for adding a user to a group.
//  *     parameters:
//  *       - name: id
//  *         in: query
//  *         required: true
//  *         type: integer
//  *         description: Group ID
//  *     responses:
//  *       200:
//  *         description: Successfully edited group
//  *       400:
//  *         description: Bad Request
//  *       404:
//  *         description: Group Not Found
// */
// router.patch('/update', (req, res) => {
//   const groupid = req.query.id;
//   if (!groupid) {
//     res.status(400).send({ error: 'Bad Request - No Group ID' });
//   }
//   // Get tasks for a group
//   // Get data for a group
//   query = `SELECT * FROM groups WHERE id::text = '` + groupid + `';`;
//   pool.query(query, (err, response) => {
//     if(err){
//       console.log("Error - Failed to select all from groups");
//       res.sendStatus(500);
//     }
//     else{
//       console.log(response.rows);
//       response.rows.length != 0 ? res.sendStatus(201) : res.sendStatus(404);
//     }
//   });
//   // res.status(200).send({ message: 'We got a PATCH request to edit group', group });
// });

/**
 * @swagger
 * /group/join/?id={groupid}&userid={userid}:
 *   patch:
 *     summary: Add a user to the group
 *     description: Takes in a user ID and group ID and adds that user to the group
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         type: integer
 *         description: Group ID
 *       - name: userid
 *         in: query
 *         required: true
 *         type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successfully added user to a group
 *       404:
 *         description: User/Group Not Found
 *       400:
 *         description: Bad Request
*/
router.patch('/join', (req, res) => {
  const groupid = req.query.id;
  const userid = req.query.userid;
  if (!groupid || !userid) {
    res.status(400).send({ error: 'Bad Request - Missing Parameters' });
  }
  else{
     // Add a user to a group 
    query = `UPDATE public.groups SET members=members || '${userid}'::uuid WHERE id::text = '${groupid}';`;
    console.log(query);
    pool.query(query, (err, response) => {
      if(err){
        console.log("Error - Failed to add user to group", err);
        res.sendStatus(500);
      }
      else{
        console.log(response.rows);
        res.sendStatus(200);
      }
    });
  }
});

/**
 * @swagger
 * /group/delete/?id={groupid}:
 *   delete:
 *     summary: Delete a group
 *     description: Takes in a group ID and deletes the group
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         type: integer
 *         description: Group ID
 *     responses:
 *       200:
 *         description: Successfully added user to a group
 *       404:
 *         description: User/Group Not Found
 *       400:
 *         description: Bad Request
*/
router.delete('/delete', (req, res) => {
  const group = req.query.id;
  if (!group) {
    res.status(400).send({ error: 'Bad Request - No Group ID' });
  }else{
      // create task and add to group
    // Get data for a group
    query = `DELETE FROM public.groups WHERE id::text='` + group + `';`;
    pool.query(query, (err, response) => {
      if(err){
        console.log("Error - Failed to delete group");
        res.sendStatus(500);
      }
      else{
        console.log(response.rows);
        res.status(200).json(response.rows);
      }
    });
  }
});
// how to export in Express
module.exports = router;
