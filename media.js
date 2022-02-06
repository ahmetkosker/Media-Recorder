const express = require('express')
var multer = require('multer');
var bodyParser = require('body-parser');
const child_process = require('child_process');

var fs = require('fs');

const app = express()

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

var upload = multer({ dest: __dirname + "../../../dejavu/mp3/" });
var type = upload.single('upl');

app.get('/', async function (req, res) {
  res.sendFile(__dirname + '/front.html');
})

app.get('/test', function (req, res) {

  res.send('test')

});

app.post('/test', type, function (req, res) {

  fs.rename(req.file.path, '/root/dejavu/mp3/' + req.file.originalname, function (err) {
    if (err) console.log('ERROR: ' + err);
  });

  const process = child_process.exec('docker exec 5b660c95863d python example_docker_postgres.py mp3/' + req.file.originalname, function (error, stdout, stderr) {

    if (error) throw error;

    res.json(stdout)

  });

});


app.listen(3000)