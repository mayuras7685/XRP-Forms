// const http = require('http');
// const express = require('express');
// const app = new express();
var {google} = require("googleapis")

const path = require('path');
// var bodyParser = require('body-parser')
// var jsonParser = bodyParser.json()

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/myroute', (req, res) => {
  const data = req.body;
  // console.log(data); // Do something with the data

  // Send a response to the frontend
  res.status(200).json({
    message: 'Received data successfully',
    data: data
  });
  grun(data)
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

async function grun(data){
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  console.log("Success")
  console.log(data.row)
  var spreadsheetId = data.sheet
  
function columnToLetter(columnIndex) {
  let letter = '';
  while (columnIndex >= 0) {
    letter = String.fromCharCode(columnIndex % 26 + 65) + letter;
    columnIndex = Math.floor(columnIndex / 26) - 1;
  }
  return letter;
}
// console.log(typeof(data.status))
const row = parseInt(data.row,10) + 2;
const column = parseInt(data.column,10);
const columnLetter = columnToLetter(column);
const cell = `${columnLetter}${row}`;
// console.log(cell);

const request = {
    spreadsheetId: spreadsheetId,
    range: cell,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [['confirmed']],
    },
  };
  googleSheets.spreadsheets.values.update(request, function (err, response) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${response.data.updatedCells} cells updated.`);
  });
}


// var fs = require('fs');

// http.createServer(function(req, res){
//     fs.readFile('index.html',function (err, data){
//         res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
//         res.write(data);
//         res.end();
//     });
// }).listen(8000);

// const port = process.env.PORT || 8000;

// sendFile will go here
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '/index.html'));
// });

// app.post('/myroute', jsonParser, (req, res) => {
//     // Execute function here
//     console.log('POST request received');
//     console.log(req.body.status); // log request body
  
//     // Send response
//     res.status(200).send('POST request received');
//   });

// app.listen(port);