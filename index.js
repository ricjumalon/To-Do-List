import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const personal = [];
const work = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.render('index.ejs', {personal});
});

app.post('/', (req, res) => {
    if(req.body.task != ""){
        personal.push(req.body.task);
    }
    res.redirect('/');
});

app.get('/work', (req, res) => {
    res.render('work.ejs', {work});
});

app.post('/work', (req, res) => {
    if(req.body.task != ""){
        work.push(req.body.task);
    }
    res.redirect('/work');
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});