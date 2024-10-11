var express = require('express');
var router = express.Router();
const Task = require('@model/taskModel'); 
const Customer = require('@model/customerModel'); 
 
router.get('/calendar', async (req, res) => {
  const newtasks = await Task.find({status: 'NEW', isDeleted: false });
  const todotasks = await Task.find({status: 'TODO', isDeleted: false });
  const ongoingtasks = await Task.find({status: 'ONGOING', isDeleted: false });
  const reviewtasks = await Task.find({status: 'REVIEW', isDeleted: false });
  const compltetasks = await Task.find({status: 'COMPLTED', isDeleted: false });

  const  tasks = await Task.find({isDeleted: false }).limit(5).sort({ createdAt: -1 });

res.render('tasks/calendar', { title: "Calendar",tasks, newtasks, todotasks, ongoingtasks, reviewtasks, compltetasks });
});




module.exports = router;
 