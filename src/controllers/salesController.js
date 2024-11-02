const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const Sequence = require('@model/sequenceModel');
const Customer = require('@model/customerModel');
const Company = require('@model/companyModel');
const Unit = require('@model/unitModel');
const Products = require('@model/goodsModel');
const Sales = require('@model/salesModel');

/*SALES */ 
router.get('/', async function(req, res, next) {

    if(req.user.role=='Administrator')
    {
      const saleslist = await Sales.find({ isDeleted: false, createdBy: req.user.id   }).populate('unit','name').populate('customer','name').populate('createdBy','name') ;  
      const customerlist = await Customer.find({ isDeleted: false , createdBy: req.user.id });    
      const unitlist = await Unit.find({ isDeleted: false, createdBy: req.user.id  });   
      const productlist = await Products.find({ isDeleted: false, createdBy: req.user.id  });    
      res.render("sales/index", {
        title: "Sales List", 
        saleslist,
        customerlist,
        unitlist,
        productlist
    });  
    }
    else
    {
      const saleslist = await Sales.find({ isDeleted: false, createdBy: req.user.id  }).populate('unit','name').populate('customer','name').populate('createdBy','name') ;  
      const customerlist = await Customer.find({ isDeleted: false, createdBy: req.user.id });    
      const unitlist = await Unit.find({ isDeleted: false, createdBy: req.user.id });  
      const productlist = await Products.find({ isDeleted: false, createdBy: req.user.id  });    
      res.render("sales/index", {
        title: "Sales List", 
        saleslist,
        customerlist,
        unitlist,
        productlist
    });   
    }
    
   
 });
 
 
router.post('/create', async function(req, res, next) {
    try {  
      
      const createdBy = req.user.id; 
      const sequenceDoc = await Sequence.findOneAndUpdate({ modelName: 'sales'+createdBy },{ $inc: { sequenceval: 1 } }, { new: true, upsert: true });    
      const saleno = 'SA-'+sequenceDoc.sequenceval; 

      const { unit, customer,discount,billingno, billingdate, drivername,vehicleno,mobileno,products,productqty,price,total,subtotal,taxamount,grandtotal,narration } = req.body;
      const createSales = new Sales({ saleno,unit, customer,discount,billingno, billingdate, drivername,vehicleno,mobileno,products,productqty,price,total,subtotal,taxamount,grandtotal,narration, createdBy  });
      await createSales.save();
      return  res.json({ success: true, message: 'Sales Created Successfully!'  });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
 
 router.post('/edit', async function(req, res, next) {
  try {
    const Companyinfo = await Company.findById(req.body.CompanyID);
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
   
  const { name, email, address, city,postcode,phone,url,status } = req.body;
  await Company.findByIdAndUpdate(req.body.company_id, {  name, email, address, city,postcode,phone,url,status });
  
  if(req.body.changepassword){
    const  Companyinfo = await Company.findById(req.body.company_id);
    Companyinfo.password = req.body.changepassword;
    await Companyinfo.save();
  } 

  res.json({ success: true, message: 'Company details updated!' });
} catch (err) {
  res.status(500).send(err.message);
}
}); 

module.exports = router; 