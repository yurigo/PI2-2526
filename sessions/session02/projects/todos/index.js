import express from "express";
import chalk from "chalk";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

let todos = [
    { id: 1 , text: "aprender node" , done: false },
    { id: 2 , text: "aprender javascript" , done: false },
    { id: 3 , text: "aprender express" , done: false },
    { id: 4 , text: "ver videos de node" , done: false },
];

app.get("/" , function(req, res) {
    res.send("<a href='http://localhost:3000/todos'>click aqui para ver los todos</a>")
})

app.get("/todos" , function(req, res){
    // hago cosas cuando llamen a: http://localhost:3000/todos GET

    res.status(200).send(todos);
})

app.get("/todos/:ID" , function(req,res) {
    // console.log(req.params.ID);
    const ID = parseInt(req.params.ID);

    const found = todos.find(function(unTodo){
        console.log(unTodo);
        return unTodo.id === ID;
    })

    res.status(200).send(found);
});

app.post("/todos" , function(req, res){
    //const objetodelcliente = req.payloadoalgo;
    const newTodo = req.body;
    newTodo.id = todos.length + 1;
    todos.push(newTodo);
    res.status(201).send(newTodo);
});

app.delete("/todos/:ID" , function(req, res){

    const ID = parseInt(req.params.ID);

    const found = todos.find( (e) => e.id === ID );
    todos = todos.filter( (e) => e.id !== ID );

    res.status(200).send(found);
});

app.put("/todos/:ID" , function(req, res){
    const ID = parseInt(req.params.ID);

    const newData = req.body;

    const found = todos.find((element) => {
        return element.id === ID
    });

    found.done = newData.done;

    res.status(200).send(found);
})

app.listen(3000, function(){
    console.log(chalk.blue("http://localhost:3000"));
});
