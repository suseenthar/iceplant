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
     const goodsproducts = await Goods.find({ isDeleted: false, createdBy: req.user.id  }).populate('createdBy','name') ;  
       res.render("settings/goods", {
        title: "Goods Products",
      Data: goodsproducts
    }); 
 });

 /* CREATE GOODS PRODUCTS. */
router.post('/goods/create', async function(req, res, next) {
    try {
      const createdBy = req.user.id; 
      const { productname, price, status, priority } = req.body;
      const createGoods = new Goods({ productname, price, status, priority, createdBy  });
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
/* EDIT GOODS. */
router.post('/goods/edit', async function(req, res, next) {
  try {
    const data = await Goods.findById(req.body.id, 'id productname status price');
    if (!data) {
      return res.status(500).json({ message: 'Product Not Found' });
    }
    return  res.json({ success: true, data });
  } catch (error) {
     return res.status(500).json({ message: error });
  } 
 });

/* EDIT GOODS. */
router.put('/goods/edit', async function(req, res, next) {
  try { 
    const { productname, status, price  } = req.body;
    await Goods.findByIdAndUpdate(req.body.good_id, { productname,price, status }); 
    res.json({ success: true, message: 'Product details updated!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
  }); 
/* EDIT SERVICES. */
router.post('/services/edit', async function(req, res, next) {
  try {
    const data = await Services.findById(req.body.id, 'id servicename status priority');
    if (!data) {
      return res.status(500).json({ message: 'Service Not Found' });
    }
    return  res.json({ success: true, data });
  } catch (error) {
     return res.status(500).json({ message: error });
  } 
 });

/* EDIT SERVICES. */
router.put('/services/edit', async function(req, res, next) {
  try { 
    const { servicename, status, priority  } = req.body;
    await Services.findByIdAndUpdate(req.body.service_id, { servicename, status, priority }); 
    res.json({ success: true, message: 'Service details updated!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
  }); 
module.exports = router;
