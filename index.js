import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;
const personal = [];
const work = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(process.DATABASE_URL || "mongodb://127.0.0.1:27017/todoListDB");

const ItemSchema = new mongoose.Schema({
    name: String,
    type: String,
    isDone: {
        type: String,
        default: "no"
    }
});

const Item = mongoose.model("Item", ItemSchema);

app.get('/', async (req, res) => {
    try {
        const data = await Item.find({type: 'personal'});
        res.render('index.ejs', { personal : data });
    } catch (error) {
        console.log("Something went wrong! Error: "+error);
    }
});

app.post('/', (req, res) => {
    if(req.body.task != ""){
        const newItem = new Item({
            name: req.body.task,
            type: "personal"
        });
        newItem.save();
    }
    res.redirect('/');
});

app.get('/work', async (req, res) => {
    try {
        const data = await Item.find({type: 'work'});
        res.render('work.ejs', {work : data});
    } catch (error) {
        console.log("Something went wrong! Error: "+error);
    }
});

app.post('/update', async (req, res) => {
    try{
        await Item.updateOne({_id: req.body.id}, {isDone : 'yes'});
        res.send({success : "true"});
    }catch(error){
        console.log(error);
    }
});

app.post('/delete', async (req, res) => {
    try{
        await Item.deleteOne({_id: req.body.id});
        res.send({success : "true"});
    }catch(error){
        console.log(error);
    }
});

app.post('/work', (req, res) => {
    if(req.body.task != ""){
        work.push(req.body.task);
        const newItem = new Item({
            name: req.body.task,
            type: "work"
        });
        newItem.save();
    }
    res.redirect('/work');
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});