if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const newsModel = require('./server/models/newsModel');

const PORT = 1999
const uri = process.env.DBURI;
const devpw = process.env.DEVPW;
const leer = ""
  
//db
mongoose.connect(uri, {
}).then(() => {
  console.log('> mongoDB connected!')
  run()
}).catch((error) => {
  console.error(error.message);
})

app.use((req, res, next) => {
    const userAgent = req.headers['user-agent'];
    const isMobile = /Mobile|Android/i.test(userAgent);
    req.isMobile = isMobile;
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views/data'));
app.set('view-engine', 'ejs')

var news = []
var loaded = false


app.get("/", async(req, res) => {
    res.render('main.ejs', {
        iM: req.isMobile
    })
})
app.get("/s", async(req, res) => {
    res.render('shop.ejs', {
        iM: req.isMobile
    })
})
app.get("/d", async(req, res) => {
    res.render('entry.ejs', {
        iM: req.isMobile
    })
})
app.get("/p", async(req, res) => {
    res.render('vis.ejs', {
        iM: req.isMobile
    })
})
app.get("/n", async(req, res) => {
    if(loaded) {
        res.render('news.ejs', {
            iM: req.isMobile,
            news: news
        })
    }
})

app.get("/loading", async(req, res) => {
    if(loaded) {
        res.render('loader.ejs', {
            iM: req.isMobile,
            loadState: leer,
        })
    }
})
app.post("/check", async(req, res) => {
    console.log(">-> Check");
    const check = req.body.pwin
    if (check == null) return;
    if (check != devpw) {
        res.redirect('/')
    };
    console.log(check + " = " + devpw);
    res.render('dev.ejs', {
        iM: req.isMobile
    })
})

app.post("/write-news", async(req, res) => {
    if(req.body.title == null || req.body.title == "") return;
    if(req.body.content == null || req.body.content == "") return;
    if(req.body.autor == null || req.body.autor == "") return;
    await createNews(
        req.body.title,
        req.body.content,
        req.body.autor
    )
    await gatherNews()
    res.redirect('/n')
})

async function gatherNews() {
    news = []
    console.log(">>> Gathering News");
    const find = await newsModel.find()
    for (let i = 0; i < find.length; i++) {
        const element = find[i];
        news.push(element)
    }
}

async function createNews(t, c, a) {
    console.log(">>> Creating News");
    const newNews = {
        title: t,
        content: c,
        autor: a
    }
    const res = new newsModel(newNews);
    res.save();
}   


app.listen(PORT)
console.log('> running on ' + PORT)

async function run() {
    console.log("> Run");
    await gatherNews();
    console.log("==> " + news[0].title);
    console.log(">>> Loaded");
    loaded = true;
    
}