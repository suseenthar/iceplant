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

  const   Customerslist = await Customer.aggregate([
    {
      $match: { isDeleted: false },
    },
    {
      $lookup: {
        from: 'companies',         
        localField: 'company_id',   
        foreignField: '_id',   
        as: 'companyinfo',             
      },
    },
    {
      $project: {                   
         name: 1,   
         code: 1, 
         email: 1, 
         address: 1, 
         city: 1,
         postcode: 1,
         phone: 1,
         status: 1,            
        'companyinfo.name': 1,             
      },
    },
    {
      $unwind: '$companyinfo' 
    } 
  ]); 
 

    //const Customerslist = await Customer.find({ isDeleted: false });  
    const Companylist = await Company.find({ isDeleted: false });    
      res.render("customers/index", {
        title: "Customer List", 
        Customers: Customerslist, 
        Companylist: Companylist, 
    }); 
 });
 
 /* CREATE CUSTOMER. */
router.post('/create', async function(req, res, next) {
    try {   
      const createdBy = req.user.id; 
      const sequenceDoc = await Sequence.findOneAndUpdate({ modelName: 'customer' },{ $inc: { sequenceval: 1 } }, { new: true, upsert: true });    
      const code = 'CUS-'+sequenceDoc.sequenceval; 

      const { name, company_id,email,password, address, city,postcode,phone,url,status} = req.body;
      const createCustomer = new Customer({ name,code,company_id, email,password, address, city,postcode,phone,url,status, createdBy  });
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
  if(req.body.status){var status = 'Active';}else{var status = 'Inactive';}
  const { firstname, lastname, gender, phone, emergencycontact, contactperson,dob, blood, joindate, address, drivinglicence, passportno, role,profilepic } = req.body;
  await User.findByIdAndUpdate(req.body.Customer_id, { firstname, lastname, gender, phone, emergencycontact, contactperson,dob, blood, joindate, address,drivinglicence, passportno, role, status,profilepic });
  
  if(req.body.changepassword){
    const  Customer = await User.findById(req.body.Customer_id);
    var newPassword = req.body.changepassword;
    Customer.password = newPassword;
    await Customer.save();
  } 

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