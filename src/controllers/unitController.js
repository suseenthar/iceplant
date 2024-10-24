const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const Unit = require('@model/unitModel');
const Sequence = require('@model/sequenceModel'); 
  
router.get('/', async function(req, res, next) {

  const data = await Unit.find({ isDeleted: false , createdBy: req.user.id  }).populate('createdBy','name') ;
 
    res.render("unit/index", {
    title: "Unit List", 
    data
  }); 

  });
 
router.post('/create', async function(req, res, next) {
    try {
      const createdBy = req.user.id; 
      const { name, code, status, startdate } = req.body;
      const units = new Unit({ name, code, status, startdate, createdBy  });
      await units.save();
      res.json({ success: true, message: 'Unit Created!' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
 
router.post('/delete/', async (req, res) => {
  try {
    const { ID } = req.body;
    await Unit.findByIdAndUpdate(ID,{ isDeleted: true }, { new: true });
    res.json({ success: true, message: 'Unit Deleted!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


module.exports = router; 