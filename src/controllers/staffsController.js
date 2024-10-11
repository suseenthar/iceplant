const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Sequence = require('@model/sequenceModel');
const User = require('@model/userModel');

/*STAFFS */ 
router.get('/', async function(req, res, next) {
    const staffslist = await User.find({ isDeleted: false,isAdmin: false });  
      res.render("staffs/index", {
        title: "Staffs List", 
        Staffs: staffslist
    }); 
 });

/*ADD STAFF */ 
router.get('/create', async function(req, res, next) {
      res.render("staffs/create", { title: "Add Staff" }); 
 });

 /* CREATE STAFF. */
router.post('/create', async function(req, res, next) {
    try {  
    const existingEmail = await User.findOne({ email:req.body.email });
    if (existingEmail) {
    return res.status(500).json({ message: 'Email already exisit' });
    }  
      const createdBy = req.user.id; 
      if(req.body.status){var status = 'Active';}else{var status = 'Inactive';}
      const sequenceDoc = await Sequence.findOneAndUpdate({ modelName: 'user' },{ $inc: { sequenceval: 1 } }, { new: true, upsert: true });    
      const uid = 'SAIP'+sequenceDoc.sequenceval; 

      const { firstname, lastname, gender, phone, emergencycontact, contactperson,dob, blood, joindate, address, email,password, drivinglicence, passportno, role,profilepic } = req.body;
      const createStaff = new User({ firstname, lastname, gender, phone, emergencycontact, contactperson,dob, blood, joindate, address, email,password,uid, drivinglicence, passportno, role, status,profilepic, createdBy  });
      await createStaff.save();
      res.json({ success: true, message: 'Staff Created!' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
 
/* EDIT STAFF */ 
router.get('/view/:id', async function(req, res, next) {
  try {
    const staffinfo = await User.findById(req.params.id);
    if (!staffinfo) {
      res.redirect('/staffs?notfound');
    }
    res.render("staffs/view", {
      title: "View Staff Details",
      data: staffinfo
    });
  } catch (error) {
    console.error(error);
    res.redirect('/staffs');
  }
});
/* EDIT STAFF */ 
router.get('/edit/:id', async function(req, res, next) {
  try {
    const staffinfo = await User.findById(req.params.id);
    if (!staffinfo) {
      res.redirect('/staffs?notfound');
    }
    res.render("staffs/edit", {
      title: "Edit Staff Details",
      data: staffinfo
    });
  } catch (error) {
    console.error(error);
    res.redirect('/staffs');
  }
});
/* EDIT SAVE STAFF. */
router.put('/edit', async function(req, res, next) {
try {
  if(req.body.status){var status = 'Active';}else{var status = 'Inactive';}
  const { firstname, lastname, gender, phone, emergencycontact, contactperson,dob, blood, joindate, address, drivinglicence, passportno, role,profilepic } = req.body;
  await User.findByIdAndUpdate(req.body.staff_id, { firstname, lastname, gender, phone, emergencycontact, contactperson,dob, blood, joindate, address,drivinglicence, passportno, role, status,profilepic });
  
  if(req.body.changepassword){
    const  staff = await User.findById(req.body.staff_id);
    var newPassword = req.body.changepassword;
    staff.password = newPassword;
    await staff.save();
  } 

   res.json({ success: true, message: 'Staff Updated!' });
} catch (err) {
  res.status(500).send(err.message);
}
});
 /* DELETE STAFFS. */
router.post('/delete/', async (req, res) => {
  try {
    const { StaffID } = req.body;
    await User.findByIdAndUpdate(StaffID,{ isDeleted: true }, { new: true });
    res.json({ success: true, message: 'Staff Deleted!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
}); 

module.exports = router; 