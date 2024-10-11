const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const File = require('@model/fileModel'); 

const uploadsDir = 'public/uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  
    }
});

const upload = multer({ storage });

//UPLOAD FILES
router.post('/upload', (req, res, next) => {
    const uploadSingle = upload.single('profilephoto');
    
    uploadSingle(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Multer-specific errors
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'File size exceeds the limit.' });
            } else if (err.code === 'LIMIT_FILE_COUNT') {
                return res.status(400).json({ error: 'Too many files.' });
            }
            // Handle other multer errors here
            return res.status(400).json({ error: 'Multer error occurred: ' + err.message });
        } else if (err) {
            // Unknown errors
            return res.status(500).json({ error: 'Unknown error occurred: ' + err.message });
        } 

        res.json({ file: `uploads/${req.file.filename}` });
    });
});

//UPLOAD FILES
router.post('/chat-upload', (req, res, next) => {
    const uploadSingle = upload.single('media');
    
    uploadSingle(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Multer-specific errors
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'File size exceeds the limit.' });
            } else if (err.code === 'LIMIT_FILE_COUNT') {
                return res.status(400).json({ error: 'Too many files.' });
            }
            // Handle other multer errors here
            return res.status(400).json({ error: 'Multer error occurred: ' + err.message });
        } else if (err) {
            // Unknown errors
            return res.status(500).json({ error: 'Unknown error occurred: ' + err.message });
        } 

        const mediaurl = `/uploads/${req.file.filename}`;
        const mediatype = req.file.mimetype.startsWith('image/') ? 'image' : 'video';
        res.json({ mediaurl, mediatype });
    });
});

//UPLOAD FILES
router.post('/signature', (req, res, next) => {
    const uploadSingle = upload.single('sign');
    
    uploadSingle(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Multer-specific errors
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'File size exceeds the limit.' });
            } else if (err.code === 'LIMIT_FILE_COUNT') {
                return res.status(400).json({ error: 'Too many files.' });
            }
            // Handle other multer errors here
            return res.status(400).json({ error: 'Multer error occurred: ' + err.message });
        } else if (err) {
            // Unknown errors
            return res.status(500).json({ error: 'Unknown error occurred: ' + err.message });
        } 

        res.json({ file: `uploads/${req.file.filename}` });
    });
});

router.post('/uploaddata', upload.single('profilephoto'), async (req, res) => {
    const newFile = new File({
        filename: req.file.originalname,
        path: req.file.path
    });

    await newFile.save();
    res.json({ file: `uploads/${req.file.filename}` });
});




module.exports = router;
