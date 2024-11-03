const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const Customer = require('@model/customerModel');
const Income = require('@model/incomeModel');
const Sequence = require('@model/sequenceModel'); 
 
/* GET INCOME. */
router.get('/', async function(req, res, next) {

  const data = await Income.find({ isDeleted: false , createdBy: req.user.id  }).populate('customer','name') ; 
  const customers = await Customer.find({ isDeleted: false , createdBy: req.user.id });    
    res.render("income/index", {
    title: "Income List", 
    data,customers
  }); 

  }); 
 /* CREATE INCOME. */
router.post('/create', async function(req, res, next) {
    try {
      const createdBy = req.user.id; 
      const sequenceDoc = await Sequence.findOneAndUpdate({ modelName: 'expense'+createdBy },{ $inc: { sequenceval: 1 } }, { new: true, upsert: true });    
      const incomeno = 'IN-'+sequenceDoc.sequenceval; 

      const { billno, date, customer, amount,narration } = req.body;
      const Incomes = new Income({ billno, date,incomeno, customer, amount,narration, createdBy  });
      await Incomes.save();
      res.json({ success: true, message: 'Income Created!' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

 /* DELETE INCOME. */
router.post('/delete/', async (req, res) => {
  try {
    const { ID } = req.body;
    await Income.findByIdAndUpdate(ID,{ isDeleted: true }, { new: true });
    res.json({ success: true, message: 'Income Deleted!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


module.exports = router; 