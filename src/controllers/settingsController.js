const express = require('express');
const router = express.Router();
const Goods = require('@model/goodsModel');
const Services = require('@model/servicesModel'); 

/* GET Dashboard. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
}); 
/* GET SERVICES PRODUCTS. */
router.get('/services', async function(req, res, next) {
  const   serviceslist = await Services.aggregate([
    {
      $match: { isDeleted: false },
    },
    {
      $lookup: {
        from: 'users',         
        localField: 'createdBy',   
        foreignField: '_id',   
        as: 'userdata',             
      },
    },
    {
      $project: {                   
         servicename: 1,   
         serviceid: 1, 
         status: 1, 
         priority: 1,             
        'userdata.firstname': 1,       
        'userdata.lastname': 1,        
      },
    },
    {
      $unwind: '$userdata' 
    } 
  ]);
 
    res.render("settings/services", {
    title: "Services List",
    Data: serviceslist
  }); 
});

/* CREATE SERVICES PRODUCTS. */
router.post('/services/create', async function(req, res, next) {
  try {
    const createdBy = req.user.id; 
    const { servicename, serviceid, status, priority } = req.body;
    const createService = new Services({ servicename, serviceid, status, priority, createdBy  });
    await createService.save();
    await logActivity(req.user.id, 'Service', 'User logged in', );
    res.json({ success: true, message: 'Service Created!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/* DELETE SERVICES PRODUCTS. */
router.post('/services/delete/', async (req, res) => {
try {
  const { ServiceID } = req.body;
  await Services.findByIdAndUpdate(ServiceID,{ isDeleted: true }, { new: true });
  res.json({ success: true, message: 'Product Deleted!' });
} catch (err) {
  res.status(500).send(err.message);
}
});

/* GET GOODS PRODUCTS. */
router.get('/goods', async function(req, res, next) {

  const   goodsproducts = await Goods.aggregate([
    {
      $match: { isDeleted: false },
    },
    {
      $lookup: {
        from: 'users',         
        localField: 'createdBy',   
        foreignField: '_id',   
        as: 'userdata',             
      },
    },
    {
      $project: {                   
         productname: 1,   
         productid: 1, 
         status: 1, 
         priority: 1,             
        'userdata.firstname': 1,       
        'userdata.lastname': 1,        
      },
    },
    {
      $unwind: '$userdata' 
    } 
  ]);
   

       res.render("settings/goods", {
        title: "Goods Products",
      Data: goodsproducts
    }); 
 });

 /* CREATE GOODS PRODUCTS. */
router.post('/goods/create', async function(req, res, next) {
    try {
      const createdBy = req.user.id; 
      const { productname, productid, status, priority } = req.body;
      const createGoods = new Goods({ productname, productid, status, priority, createdBy  });
      await createGoods.save();
      res.json({ success: true, message: 'Product Created!' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

 /* DELETE GOODS PRODUCTS. */
router.post('/goods/delete/', async (req, res) => {
  try {
    const { ProductID } = req.body;
    await Goods.findByIdAndUpdate(ProductID,{ isDeleted: true }, { new: true });
    res.json({ success: true, message: 'Product Deleted!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
