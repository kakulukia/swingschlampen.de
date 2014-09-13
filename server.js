var express = require('express');
var app = express();

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
        user: 'kakulukia@gmail.com',
        pass: 'mni2639'
    }
});


app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/bower_components'));


app.post('/send-mail', function(req, res) {
    console.log(req.body.message);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'SwingSchlampen.de <andy@freilandkiwis.de>', // sender address
        to: 'andy@freilandkiwis.de', // list of receivers
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




var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
