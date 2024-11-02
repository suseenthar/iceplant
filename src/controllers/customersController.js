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
      const { name,discount,address, city,postcode,phone,status} = req.body;
      const createCustomer = new Customer({ name,discount,address, city,postcode,phone,status, createdBy  });
      await createCustomer.save();
      return  res.json({ success: true, message: 'Customer Created Successfully!'  });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
 
/* EDIT CUSTOMER */ 
router.post('/edit', async function(req, res, next) {
  try {
    const data = await Customer.findById(req.body.id); 
    return  res.json({ success: true, data });
  } catch (error) {
    console.error(error);
   }
});
/* EDIT SAVE CUSTOMER. */
router.put('/edit', async function(req, res, next) {
try {
   
  const { name,address, city,postcode,phone,status,discount } = req.body;
  await Customer.findByIdAndUpdate(req.body.customerid, { name,address, city,postcode,phone,status,discount }); 
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