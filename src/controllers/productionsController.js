const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const Unit = require('@model/unitModel');
const Production = require('@model/productionModel');
const Sequence = require('@model/sequenceModel'); 
 
/* GET PRODUCTIONS. */
router.get('/', async function(req, res, next) {

  const data = await Production.find({ isDeleted: false , createdBy: req.user.id  }).populate('unit','name') ;
  const unitlist = await Unit.find({ isDeleted: false , createdBy: req.user.id  });
 
    res.render("production/index", {
    title: "Productions List", 
    data,unitlist
  }); 

  });
/* GET CREATE. */
router.get('/created', async function(req, res, next) {
    const unitdata = await Unit.find({ isDeleted: false , createdBy: req.user.id  }).populate('createdBy','name') ;
    res.render("production/create", {
    title: "Productions Create",  
    unitdata
  }); 

  });
 /* CREATE PRODUCTIONS. */
router.post('/create', async function(req, res, next) {
    try {
      const createdBy = req.user.id; 
      const { unit, date, quantity, bars } = req.body;
      const productions = new Production({ unit, date, quantity, bars, createdBy  });
      await productions.save();
      res.json({ success: true, message: 'Production Created!' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

 /* DELETE PRODUCTIONS. */
router.post('/delete/', async (req, res) => {
  try {
    const { ID } = req.body;
    await Production.findByIdAndUpdate(ID,{ isDeleted: true }, { new: true });
    res.json({ success: true, message: 'Production Deleted!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


module.exports = router; 