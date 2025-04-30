// server.js (backend)
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
    const formData = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'itselena908765@gmail.com',
            pass: 'Iloveroblox'
        }
    });

    const mailOptions = {
        from: 'itselena908765@gmail.com',
        to: 'itselena908765@gmail.com',
        subject: 'New Form Submission',
        text: JSON.stringify(formData, null, 2)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).send(error.toString());
        res.status(200).send('Email sent');
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
