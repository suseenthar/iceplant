const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const Unit = require('@model/unitModel');
const Expense = require('@model/expenseModel');
const Supplier = require('@model/suppliersModel');
const Sequence = require('@model/sequenceModel'); 
 
/* GET PRODUCTIONS. */
router.get('/', async function(req, res, next) {

  const data = await Expense.find({ isDeleted: false , createdBy: req.user.id  }).populate('supplier','name').populate('createdBy','name') ;  ; 
  const supplierlist = await Supplier.find({ isDeleted: false , createdBy: req.user.id });    
    res.render("expenses/index", {
    title: "Expenses List", 
    data , supplierlist
  }); 

  }); 
 /* CREATE PRODUCTIONS. */
router.post('/create', async function(req, res, next) {
    try {
      const createdBy = req.user.id; 
      const sequenceDoc = await Sequence.findOneAndUpdate({ modelName: 'expense'+createdBy },{ $inc: { sequenceval: 1 } }, { new: true, upsert: true });    
      const billno = 'EX-'+sequenceDoc.sequenceval; 

      const { date, supplier, amount,narration } = req.body;
      const Expenses = new Expense({ supplier, date,billno, amount,narration, createdBy  });
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