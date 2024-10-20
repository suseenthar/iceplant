const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Sequence = require('@model/sequenceModel');
const Customer = require('@model/customerModel');
const Company = require('@model/companyModel');

/*CUSTOMERS */ 
router.get('/', async function(req, res, next) { 
  const Customerslist = await Customer.find({ isDeleted: false , createdBy: req.user.id }).populate('createdBy','name');   
       res.render("customers/index", {
        title: "Customer List", 
        Customers: Customerslist, 
     }); 
 });
 
 /* CREATE CUSTOMER. */
router.post('/create', async function(req, res, next) {
    try {   
      const createdBy = req.user.id; 
      const sequenceDoc = await Sequence.findOneAndUpdate({ modelName: 'CUS-'+createdBy },{ $inc: { sequenceval: 1 } }, { new: true, upsert: true });    
      const code = 'CUS-'+sequenceDoc.sequenceval; 

      const { name,address, city,postcode,phone,status} = req.body;
      const createCustomer = new Customer({ name,code,address, city,postcode,phone,status, createdBy  });
      await createCustomer.save();
      return  res.json({ success: true, message: 'Customer Created Successfully!'  });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
 
/* EDIT CUSTOMER */ 
router.get('/view/:id', async function(req, res, next) {
  try {
    const Customerinfo = await User.findById(req.params.id);
    if (!Customerinfo) {
      res.redirect('/customers?notfound');
    }
    res.render("customers/view", {
      title: "View Customer Details",
      data: Customerinfo
    });
  } catch (error) {
    console.error(error);
    res.redirect('/customers');
  }
});
/* EDIT CUSTOMER */ 
router.get('/edit/:id', async function(req, res, next) {
  try {
    const Customerinfo = await User.findById(req.params.id);
    if (!Customerinfo) {
      res.redirect('/customers?notfound');
    }
    res.render("customers/edit", {
      title: "Edit Customer Details",
      data: Customerinfo
    });
  } catch (error) {
    console.error(error);
    res.redirect('/customers');
  }
});
/* EDIT SAVE CUSTOMER. */
router.put('/edit', async function(req, res, next) {
try {
   
  const { name,address, city,postcode,phone,status } = req.body;
  await User.findByIdAndUpdate(req.body.Customer_id, { name,address, city,postcode,phone,status });
  

   res.json({ success: true, message: 'Customer Updated!' });
} catch (err) {
  res.status(500).send(err.message);
}
});
 /* DELETE CUSTOMER. */
router.post('/delete/', async (req, res) => {
  try {
    const { CustomerID } = req.body;
    await Customer.findByIdAndUpdate(CustomerID,{ isDeleted: true }, { new: true });
    res.json({ success: true, message: 'Customer Deleted!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
}); 

module.exports = router; 