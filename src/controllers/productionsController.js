const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const Unit = require('@model/unitModel');
const Production = require('@model/productionModel');
const Sequence = require('@model/sequenceModel'); 
var pdf = require('html-pdf-node'); 
 
/* GET PRODUCTIONS. */
router.get('/', async function(req, res, next) { 
  
  const data = await Production.find({ isDeleted: false , createdBy: req.user.id  }).populate('unit','name');
    res.render("production/index", {
    title: "Productions List", 
    data 
  }); 

  });
/* GET CREATE. */
router.get('/create', async function(req, res, next) { 
    const unitlist = await Unit.find({ isDeleted: false , createdBy: req.user.id  });
    res.render("production/create", {
    title: "Productions Create",  
    unitlist 
  }); 

  });

/* GET EDIT. */
router.get('/edit/:id', async function(req, res, next) { 
  const prodata = await Production.findById(req.params.id);
  const unitlist = await Unit.find({ isDeleted: false , createdBy: req.user.id  });
  res.render("production/edit", {
  title: "Productions Edit",  
  unitlist ,prodata
}); 

});


 /* CREATE PRODUCTIONS. */
router.post('/create', async function(req, res, next) {
    try {
      const createdBy = req.user.id; 
      const {  unit,totalbars } = req.body;
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const productionCount = await Production.countDocuments({
        unit: unit,
        date: { $gte: startOfDay, $lte: endOfDay },
      });
      
      let newRound = productionCount + 1;

      const production = new Production({
      unit,
      bars: totalbars,
      data: req.body,
      createdBy,
      round: newRound,
      });
      await production.save();
      res.json({ success: true, message: 'Production Created!' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
   /* UPDATE PRODUCTIONS. */
  router.put('/update', async function(req, res, next) {
    try {
       const { unit,totalbars } = req.body;
       await Production.findByIdAndUpdate(req.body.id, { unit,bars:totalbars,data:req.body  });
       res.json({ success: true, message: 'Production Updated!' });
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


/* GET DOWNLOAD. */
router.get('/download/:id', async function(req, res, next) { 
  try {
    const prodata = await Production.findById(req.params.id);
    const unitlist = await Unit.find({ isDeleted: false , createdBy: req.user.id  });


    let rows = '';
    for (let i = 1; i < 30; i++) {
        const item = prodata.data;  
    
        rows += `
           <tr>
            <td>${i + 1}</td>
              <td>${item[`time-${i}`] ? item[`time-${i}`] : '--'}</td>
             <td>${item[`ampm-${i}`] ? item[`ampm-${i}`] : '--'}</td>
            <td>${item[`qty-${i}`] ? item[`qty-${i}`] : '--'}</td>
             <td>${item[`tot-${i}`] ? item[`tot-${i}`] : '--'}</td>
         </tr>
        `;
    }
    

    const htmlContent = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Production Sheet</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f9f9f9;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: center;
        }
        th {
            background-color: #38518b;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        tr:hover {
            background-color: #f1f1f1;
        }
    </style>
</head>
<body>
    <h3>Production Sheet</h3>
    <table>
        <thead>
            <tr style="background-color: #38518b;">
                <th>SNO</th>
                <th>Time</th>
                <th>Am/PM</th>
                <th>Quantity</th>
                <th>Total Quantity</th> 
             </tr>
        </thead>
        <tbody> 

            ${rows}
        </tbody>
    </table>
</body>
</html>

    `;

    // Create a PDF buffer
    const file = { content: htmlContent };
    const pdfBuffer = await pdf.generatePdf(file, { format: 'A4' });

    // Set headers for download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="reports.pdf"');
    res.send(pdfBuffer);
} catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('An error occurred while generating the PDF.');
}
});

module.exports = router; 