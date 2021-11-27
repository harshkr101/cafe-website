const  express = require('express');
const  path = require('path')
const  bodyParser = require('body-parser');
const  {promisify} = require('util');
const  fs = require('fs');
const  cookieParser = require('cookie-parser');
const  rateLimit = require("express-rate-limit");
const  readdirAsync = promisify(fs.readdir);
const  readFileAsync = promisify(fs.readFile);
const  app = express();
const  port = process.env.PORT || 3005;
const  limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 1000, // limit each IP to 100 requests per windowMs
            message: "Too many requests from this IP, please try again later"
});

app.set('trust proxy', 1);
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join( __dirname,'../','client/build')));

const authRoutes = require('./routes/auth.js');
const orderRoutes = require('./routes/orders.js');

app.use('/api/user',authRoutes);
app.use('/api',orderRoutes);


//Admin get all database
app.get('/api/admin/data/:email', async (req, res) => {
    try {
        if (req.params.email === 'admin') {
            const data = require('./fake_db/data');
            res.status(200).send({msg: 'Admin data', data: data});
        } else {
            res.status(500).send({msg: 'User can\'t get this data...'});
        }
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});


//Get gallery images (Simulates database access)
app.get('/api/gallery', async (req, res) => {
    try {
        let images = await readdirAsync('./assets');
        for (let i in images) {
            let buffer = await readFileAsync('./assets/' + images[i], {encoding: 'base64'});
            images[i] = {img: buffer, title: images[i], key: i};
        }
        res.status(200).send({images: images});
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

//Serves react client static files
app.get('*', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../','client/build/index.html'));
    } catch (e) {
        res.status(500).send({msg: e.message});
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;

