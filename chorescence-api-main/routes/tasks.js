/* -------Express------*/
const express = require('express');

const router = express.Router();

router.use(express.json());

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
 * /tasks/?groupid=&taskid=:
 *   get:
 *     summary: Retrieve tasks data for a group
 *     description: Takes in a group ID and/or task ID and
 *       returns either all tasks for the group or the one specified task
 *     parameters:
 *       - name: groupid
 *         in: query
 *         required: true
 *         type: integer
 *         description: Group ID
 *       - name: taskid
 *         in: query
 *         required: false
 *         type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Returns Task Data
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 *
*/
router.get('/', (req, res) => {
  const groupid = req.query.groupid;
  const taskid = req.query.taskid;
  console.log(groupid, taskid);
  // error handling if no IDS
  if ((!groupid && !taskid) || (!groupid && taskid)) {
    res.sendStatus(400);
    return;
  }
  // Get Specified task from a group
  else if (groupid && taskid) {
    query = `SELECT id, groupid, description, assigned, "creationDate", "dueDate", completed, "timeCompleted", comments, name FROM public.tasks WHERE id::text ='` + taskid + `';`;
    pool.query(query, (err, response) => {
      if(err){
        console.log("Error - Failed to select all from groups");
        res.sendStatus(500);
      }
      else{
        console.log(response.rows);
        response.rows.length != 0 ? res.status(200).json(response.rows) : res.sendStatus(404);
      }
    });
  }
  // Get ALL tasks for a group
  else if (groupid) {
    query = `SELECT id, groupid, description, assigned, "creationDate", "dueDate", completed, "timeCompleted", comments, name FROM public.tasks WHERE groupid::text ='` + groupid + `';`;
    pool.query(query, (err, response) => {
      if(err){
        console.log("Error - Failed to select all from groups");
        res.sendStatus(500);
      }
      else{
        console.log(response.rows);
        response.rows.length != 0 ? res.status(200).json(response.rows) : res.sendStatus(404);
      }
    });
  }
});

/**
 * @swagger
 * /tasks/?groupid=&data=:
 *   post:
 *     summary: Create a new task
 *     description: Takes in a group ID and creates a new task
 *     parameters:
 *       - name: groupid
 *         in: query
 *         required: true
 *         type: integer
 *         description: Group ID
 *       - name: data
 *         in: query
 *         required: true
 *         type: object
 *         description: all data to be inserted into database
 *     responses:
 *       200:
 *         description: Returns Success Message
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Group Not Found 
 *
*/
router.post('/', (req, res) => {
  //Get data from request
  const groupid = req.query.groupid;
  let data = req.body;
  // data.description = pool.escapeString(data.description);
  console.log("Asked for", data);
  // handling empty request
  if (!groupid || !data) {
    res.status(400).send({ error: 'Bad Request - Missing Parameters' });
    return;
  }
  //Add task to database
  query = 'INSERT INTO public.tasks(groupid, name, description, assigned, "creationDate", "dueDate", completed, comments) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  console.log("Query", query);
  pool.query(query, [data.groupid, data.name, data.description, data.assigned, data.creationDate, data.dueDate, false, '{}'], (err, response) => {
    if(err){
      console.log(err, "Error - Failed to add task");
      res.sendStatus(500);
      return;
    }
    else{
      console.log(response.rows);
      res.sendStatus(201);
      return;
    }
  });
});

/**
 * @swagger
 * /tasks/?groupid=&taskid=:
 *   patch:
 *     summary: Update a task
 *     description: Takes in a group ID and task ID and updates the data for that task
 *     parameters:
 *       - name: groupid
 *         in: query
 *         required: true
 *         type: integer
 *         description: Group ID
 *       - name: taskid
 *         in: query
 *         required: true
 *         type: integer
 *         description: Task ID
 *       - name: data
 *         in: body
 *         required: true
 *         type: object
 *         description: Data
 *     responses:
 *       200:
 *         description: Returns Success Message
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 *
*/
router.patch('/', (req, res) => {
  const groupid = req.query.groupid;
  const taskid = req.query.taskid;
  const data = req.body;
  console.log(data);
  // error handling if no IDS
  if (!groupid || !taskid || !data) {
    res.sendStatus(400);
    return;
  }
  //IF request is ONLY to mark as complete
  else if(data.hasOwnProperty('completed')){
    query = 'UPDATE public.tasks SET completed=$1 WHERE id::text = $2;';
    // console.log("Query", query);
    pool.query(query, [data.completed, taskid], (err, response) => {
      if(err){
        console.log(err, "Error - Failed to update task");
        res.sendStatus(500);
        return;
      }
      else{
        console.log(response);
        res.sendStatus(201);
        return;
      }
    });
  }
  //IF request is to add a comment
  else if(data.hasOwnProperty('commentor')){
    query = `UPDATE public.tasks SET comments=comments || '{ "commentor": "${data.commentor}", "comment": "${data.comment}"}'::json WHERE id::text = '${data.taskid}'`;
    pool.query(query, (err, response) => {
      if(err){
        console.log(err, "Error - Failed to update task");
        res.sendStatus(500);
        return;
      }
      else{
        console.log(response);
        res.sendStatus(201);
        return;
      }
    });
  }
  
  // const group = groups.find((item) => item.id == groupid);
  // // 404 if group not found
  // if (!group) res.sendStatus(404);

  // // if group found find the task
  // const task = group.tasks.find((item) => item.id == taskid);
  // // return task if found, otherwise 404
  // task ? res.status(200).json({ message: `We found task ${task.id}` }) : res.sendStatus(404);
});

/**
 * @swagger
 * /tasks/?groupid=&taskid=:
 *   delete:
 *     summary: Delete a task
 *     description: Takes in a group ID and task ID and deletes the task
 *     parameters:
 *       - name: groupid
 *         in: query
 *         required: true
 *         type: integer
 *         description: Group ID
 *       - name: taskid
 *         in: query
 *         required: true
 *         type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Returns Success Message
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad Request
 *
*/
router.delete('/', (req, res) => {
  const groupid = req.query.groupid;
  const taskid = req.query.taskid;

  // error handling if no IDS
  if (!groupid || !taskid) {
    res.sendStatus(400);
  }else{
    query = 'DELETE FROM public.tasks WHERE id::text = $1;';
    // console.log("Query", query);
    pool.query(query, [taskid], (err, response) => {
      if(err){
        console.log(err, "Error - Failed to delete task");
        res.sendStatus(500);
      }
      else{
        console.log(response);
        res.sendStatus(200);
      }
    });
  }

});
// how to export in Express
module.exports = router;
