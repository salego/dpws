const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');

//***** Setup Express App, App Engine,  *****
const app = express();
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 4141,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '192.168.1.8';
app.set('view engine', 'ejs');      // set 'ejs' as view engine
app.use(express.static('public'));  // set 'public' folder as static folder

//***** Use body-parser middleware
//Order of app.use is very important
//usage is based on the order.  This will be available in all the routes
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '16mb'
}));
app.use(bodyParser.json({limit: '16mb'}));

const storage = multer.diskStorage({
    destination: function(req,res,cb) {
        folderToUse = './public/gallery/'+req.body.eventName;
        if(!fs.existsSync(folderToUse)){
            fs.mkdir(folderToUse);
            console.log('folder created: ', folderToUse);
        }
        cb(null,folderToUse+'/');
    },
    filename: function(req, file, cb){
        cb(null, req.body.eventName+'-'+Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length-1]);
    }

});
const Upload = multer({storage: storage});



app.get('/', function(req,res,next){
    res.sendfile("./public/index.html");
});

app.get('/gallery', function(req, res, next){
    const eventName = 'Inaguration';
    const imgGallery = './public/gallery/';
    var imageInfo = [];

    function getDirectories(path) {
        return fs.readdirSync(path).filter(function (file) {
            return fs.statSync(path+'/'+file).isDirectory();
        });
    }
    var eventsList = [];
    var imgFolder=temp='';
    var eachImageInfo = {};
    var imagesList = [];
    eventsList = getDirectories("./public/gallery/");
    console.log('Folders: ',eventsList);
    eventsList.forEach(function(eventValue){
        //console.log('Event Name: ', eventValue)
        imgFolder = imgGallery + eventValue;
        imagesList = [];
        temp='';        
        fs.readdirSync(imgFolder).forEach(file =>{
            temp = eventValue+'/'+file;
            imagesList.push(temp); 
            console.log('imagesList: ', imagesList)
        });
        eventClass = eventValue.replace(/\s/g,'');
        imageInfo.push({'eventName': eventValue, 'eventClass': eventClass,'imageDetails': imagesList});
    })
    console.log('imageInfo: ', imageInfo);
    res.render('eventsImages',{eventImages: imageInfo});
    //res.send('Hello.....check console log on server');
    //Read File names synchronosly.....
    
});

app.post('/uploadImgs', Upload.any(), function(req,res,next){
    console.log('from inside upload imgs: ', req.files);
    res.send(req.files);
});

//error handling middleware
//There is no default package used console.error;
//instead a custom function is created to handle error or exceptions
app.use(function(err, req, res, next){
  //Update the status code and also throw message received from err object
  console.log(err);
  res.status(422).send({Error: err.message});
});


// Use environment variable 'port' if it is set or use 4000
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);