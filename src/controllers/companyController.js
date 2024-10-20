const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Sequence = require('@model/sequenceModel');
const User = require('@model/userModel');

/*COMPANY */ 
router.get('/', async function(req, res, next) {
    const companylist = await User.find({ isDeleted: false , isAdmin: false });  
      res.render("company/index", {
        title: "Company List", 
        companydata: companylist
    }); 
 });
 
 /* CREATE COMPANY. */
router.post('/create', async function(req, res, next) {
    try {  
    const existingEmail = await User.findOne({ email:req.body.email });
    if (existingEmail) {
    return res.status(500).json({ message: 'Email already exisit' });
    }  
      const createdBy = req.user.id; 
      const sequenceDoc = await Sequence.findOneAndUpdate({ modelName: 'company' },{ $inc: { sequenceval: 1 } }, { new: true, upsert: true });    
      const code = 'COM-'+sequenceDoc.sequenceval; 

      const { name, email,password, address, city,postcode,phone,status } = req.body;
      const createCompany = new User({ name,code, email,password, address, city,postcode,phone,status,role:'Company', createdBy  });
      await createCompany.save();
      return  res.json({ success: true, message: 'Company Created Successfully!'  });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
 
 router.post('/edit', async function(req, res, next) {
  try {
    const Companyinfo = await User.findById(req.body.CompanyID);
    if (!Companyinfo) {
      return res.status(500).json({ message: 'Conpany Not Found' });
    }
    return  res.json({ success: true, data: Companyinfo });
  } catch (error) {
     return res.status(500).json({ message: error });
  } 
 });
 
/* EDIT SAVE CUSTOMER. */
router.put('/edit', async function(req, res, next) {
try {
   
  const { name, email, address, city,postcode,phone,status } = req.body;
  await User.findByIdAndUpdate(req.body.company_id, {  name, email, address, city,postcode,phone,status });
  
  if(req.body.changepassword){
    const  Companyinfo = await User.findById(req.body.company_id);
    Companyinfo.password = req.body.changepassword;
    await Companyinfo.save();
  } 

  res.json({ success: true, message: 'Company details updated!' });
} catch (err) {
  res.status(500).send(err.message);
}
}); 

module.exports = router; 