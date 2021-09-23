const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.listen(3000);
const fs = require('fs')

app.use(express.urlencoded());

app.use(express.json());

app.get('/', (req, res) => {  
    fs.readFile('./todos.json', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        let pastTodos = fs.readFileSync('./pastTodos.json'); 
        let parsedJsonPast = JSON.parse("[" + pastTodos + "]");
    
        let parsedJson = JSON.parse("[" + data + "]");
        res.render('index', { json: parsedJson, pastJson: parsedJsonPast }); 
    });
}); 


app.put('/', (req, res) => { 
    let index = JSON.stringify(req.body);
    
    let deleted_task;
    let newTasks = [];
    
    fs.readFile('./todos.json', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        let parsedJson = JSON.parse("[" + data + "]");
        deleted_task = parsedJson[JSON.parse(index).index];   

        for (let task of parsedJson) {
            if (task != deleted_task) {
                newTasks.push(task);
            }
        }

        newTasks = JSON.stringify(newTasks);
        let substring = newTasks.substring(1);
        let newSubstring = substring.substring(0, substring.length - 1);

        let parseJsonNew = JSON.parse("[" + newSubstring + "]");
        fs.writeFileSync('./todos.json', newSubstring);
         
        let pastTodos = fs.readFileSync('./pastTodos.json'); 

        if (pastTodos.length != 0) {
            pastTodos = pastTodos + "," + JSON.stringify(deleted_task);
        } else {
            pastTodos = JSON.stringify(deleted_task);
            console.log(pastTodos);
        } 
        
        fs.writeFileSync('./pastTodos.json', pastTodos);
    
        let pastTodosJson = JSON.parse("[" + pastTodos + "]");
        response.render('index', { json: parseJsonNew, pastJson: pastTodosJson });  
    });

    res.end(); 
});

app.post('/', function(request, response){ 
    let data = JSON.stringify(request.body.todo);

    let rawdata = fs.readFileSync('./todos.json'); 

    if (rawdata.length != 0) {
        rawdata = rawdata + "," + data;
    } else {
        rawdata = data; 
    }
    
    fs.writeFileSync('./todos.json', rawdata);

    let pastTodos = fs.readFileSync('./pastTodos.json'); 
    let parsedJson = JSON.parse("[" + rawdata + "]");
    let parsedJsonPast = JSON.parse("[" + pastTodos + "]");
 
    response.render('index', { json: parsedJson, pastJson: parsedJsonPast });  
    response.end();
}); 