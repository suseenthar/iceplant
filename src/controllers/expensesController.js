const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const Unit = require('@model/unitModel');
const Expense = require('@model/expenseModel');
const Sequence = require('@model/sequenceModel'); 
 
/* GET PRODUCTIONS. */
router.get('/', async function(req, res, next) {

  const data = await Expense.find({ isDeleted: false , createdBy: req.user.id  }) ; 
    res.render("expenses/index", {
    title: "Expenses List", 
    data 
  }); 

  }); 
 /* CREATE PRODUCTIONS. */
router.post('/create', async function(req, res, next) {
    try {
      const createdBy = req.user.id; 
      const sequenceDoc = await Sequence.findOneAndUpdate({ modelName: 'expense'+createdBy },{ $inc: { sequenceval: 1 } }, { new: true, upsert: true });    
      const expenseno = 'EX-'+sequenceDoc.sequenceval; 

      const { billno, date, expenseto, amount,narration } = req.body;
      const Expenses = new Expense({ billno, date,expenseno, expenseto, amount,narration, createdBy  });
      await Expenses.save();
      res.json({ success: true, message: 'Expense Created!' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

 /* DELETE PRODUCTIONS. */
router.post('/delete/', async (req, res) => {
  try {
    const { ID } = req.body;
    await Expense.findByIdAndUpdate(ID,{ isDeleted: true }, { new: true });
    res.json({ success: true, message: 'Expense Deleted!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


module.exports = router; 