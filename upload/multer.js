const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, './images/'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0]);
    }
});

const multi_upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg formats are allowed!');
            err.name = 'ExtensionError';
            return cb(err);
        }
    },
}).array('uploadedImages', 2);

app.post('/projects', (req, res) => {
    multi_upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
            return;
        } else if (err) {
            if (err.name == 'ExtensionError') {
                res.status(413).send({ error: { message: err.message } }).end();
            } else {
                res.status(500).send({ error: { message: `Unknown uploading error: ${err.message}` } }).end();
            }
            return;
        }

        // Everything went fine.
        // Show files `req.files`
        // Show body `req.body`
        res.status(200).end('Your files uploaded.');
    });
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Upload' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
