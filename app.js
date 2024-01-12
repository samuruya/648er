if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();

const PORT = 1999

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views/data'));
app.set('view-engine', 'ejs')

app.get("/", async(req, res) => {
    res.render('main.ejs')
})

app.listen(PORT)
console.log('running on ' + PORT)