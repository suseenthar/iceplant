const express = require('express');
const router = express.Router();
const Goods = require('@model/goodsModel');
const Supplier = require('@model/suppliersModel'); 

/* GET Dashboard. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
}); 
/* GET SERVICES PRODUCTS. */
router.get('/suppliers', async function(req, res, next) {
  
  const Supplierlist = await Supplier.find({ isDeleted: false, createdBy: req.user.id  }).populate('createdBy','name') ;  
    res.render("settings/suppliers", {
    title: "Suppliers List",
    Data: Supplierlist
  }); 
});

/* CREATE SERVICES PRODUCTS. */
router.post('/suppliers/create', async function(req, res, next) {
  try {
    const createdBy = req.user.id; 
    const { name, contactno, city, address } = req.body;
    const createSupplier = new Supplier({ name, contactno, address, city, createdBy  });
    await createSupplier.save(); 
    res.json({ success: true, message: 'Supplier Created!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/* DELETE SERVICES PRODUCTS. */
router.post('/suppliers/delete/', async (req, res) => {
try {
  const { ID } = req.body;
  await Supplier.findByIdAndUpdate(ID,{ isDeleted: true }, { new: true });
  res.json({ success: true, message: 'Supplier Deleted!' });
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
router.post('/suppliers/edit', async function(req, res, next) {
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
router.put('/suppliers/edit', async function(req, res, next) {
  try { 
    const { servicename, status, priority  } = req.body;
    await Services.findByIdAndUpdate(req.body.service_id, { servicename, status, priority }); 
    res.json({ success: true, message: 'Service details updated!' });
  } catch (err) {
    res.status(500).send(err.message);
  }
  }); 
module.exports = router;
