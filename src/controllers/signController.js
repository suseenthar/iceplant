const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path'); 

 
//UPLOAD FILES
router.post('/upload', (req, res, next) => {
    const signData = req.body.sign; 
    const matches = signData.match(/^data:image\/([a-zA-Z]+);base64,([^\s]+)$/);
    const ext = matches[1];
    const data = matches[2];
    const filename = `checklist-${Date.now()}.${ext}`;
    const filepath = path.join('public/sign', filename);
    fs.writeFile(filepath, Buffer.from(data, 'base64'), (err) => {
    if (err) {return res.status(500).send({ message: err+'Error saving the image' });} 
    return res.send({ message: 'Image uploaded successfully', filename: filename });
    });
 
});




module.exports = router;
