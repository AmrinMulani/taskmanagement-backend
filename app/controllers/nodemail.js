
"use strict";
const nodemailer = require("nodemailer");
const response = require("../libs/responseLib");



let sendMail = (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'taskmanagement.2019@gmail.com',
            pass: 'bytheway10@'
        }
    });
    const mailOptions = {
        from: 'taskmanagement.2019@gmail.com', // sender address
        to: `${req.params.Email}`, // list of receivers
        subject: 'Please reset your password', // Subject line
        html: `We heard that you lost your Task Management password. Sorry about that!<br>
        But don’t worry! You can use the following link to reset your password:<br>
        <a href="http://todomanagement.tk/resetpassword"> Reset your password </a> <br>
        Thanks<br>
        Your friend` // plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        let apiResponse = "";
        if (err) {
            console.log(err)
            apiResponse = response.generate(true, 'error while sending emails- ' + err, 500, null);
        }
        else {
            console.log(info);
            apiResponse = response.generate(false, 'Mail sent successfully!', 200, null);
        }
        res.send(apiResponse);
    });
}
module.exports = {
    sendMail: sendMail
}

