const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.listen(3000);
const fs = require('fs')

app.use(express.urlencoded());

app.use(express.json());

app.post('/', function(request, response){ 
    let data = JSON.stringify(request.body.todo);
    fs.writeFileSync('./todos.json', data);

    fs.readFile('./todos.json', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.render('index', { json: data }); 
    });
}); 

app.get('/', (req, res) => {  
    fs.readFile('./todos.json', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.render('index', { json: data }); 
    });
}); 