var express = require('express');
var app = express();
var fs = require('fs');
var _ = require('lodash');

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}));


// simple logger
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});


var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'swingschlamps@gmail.com',
        pass: 'wenndumagst'
    }
});


app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/bower_components'));


app.post('/send-mail', function(req, res) {
    console.log(req.body);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: req.body.from, // sender address
        to: 'swingschlamps@gmail.com', // list of receivers
        subject: req.body.subject,
        text: req.body.message
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });

    res.send('done!');
});

app.use('/images', function(req, res, next){
    var images = '';
    var photos_dir = __dirname + '/assets/fotos';
    console.log(photos_dir);
    try {
        var dir_listing = fs.readdirSync(photos_dir);
    } catch (e){
        console.log(e);
    }

    _(dir_listing).forEach(function(image) {
        if (_(image).contains('.jpg')){
            images += '<img class="lazy" data-original="/fotos/' + image + '" height="600px"/>';
        }

    });
    res.send(images);
});


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
