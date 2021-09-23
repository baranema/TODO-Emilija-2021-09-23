const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.listen(3000);
const fs = require('fs')

app.use(express.urlencoded());

app.use(express.json());

app.post('/', function(request, response){ 
    let data = JSON.stringify(request.body.todo);

    let rawdata = fs.readFileSync('./todos.json'); 

    if (rawdata.length != 0) {
        rawdata = rawdata + ", " + data;
    } else {
        rawdata = data; 
    }
    
    fs.writeFileSync('./todos.json', rawdata);
});  

app.get('/', (req, res) => {  
    fs.readFile('./todos.json', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        let parsedJson = JSON.parse("[" + data + "]");
        res.render('index', { json: parsedJson }); 
    });
}); 