const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const Customer = require('@model/customerModel');
const Income = require('@model/incomeModel');
const Sequence = require('@model/sequenceModel'); 
const Sales = require('@model/salesModel');
 
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
      const billno = 'IN-'+sequenceDoc.sequenceval;  
      const {  date, customer, amount,narration } = req.body;
      const Incomes = new Income({ billno, date, customer, amount,narration, createdBy  });
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
 

 /* OUTSTANDING AMOUNT. */
 router.post('/outstanding/', async (req, res) => {
  try {
    const customerId= req.body.id;

    const salesresult = await Sales.aggregate([
      {
          $match: {
              customer: new mongoose.Types.ObjectId(customerId),
              isDeleted: false  
          }
      },
      {
          $group: {
              _id: "$customer",
              totalSalesAmount: { $sum: "$grandtotal" }  
          }
      }
  ]);

  const incomeresult = await Income.aggregate([
    {
        $match: {
            customer: new mongoose.Types.ObjectId(customerId),
            isDeleted: false  
        }
    },
    {
        $group: {
            _id: "$customer",
            totalInAmount: { $sum: "$amount" }  
        }
    }
]); 
    const netSalesAmount = salesresult[0] ? salesresult[0].totalSalesAmount : 0;
    const totalIncomeAmount =  incomeresult[0] ? incomeresult[0].totalInAmount : 0;
    const salesMinusIncome = netSalesAmount - totalIncomeAmount;
    res.json({ success: true, amount: salesMinusIncome });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


module.exports = router; 