const express = require('express')
const Article = require('./models/article')
const mongoose = require('mongoose')
const articleRouter = require('./routes/article')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog',{ 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex : true
})

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended : false}))

app.use(methodOverride('_method'))

app.get('/',async (req,res)=>{
    const article = await Article.find().sort({createAt: 'desc'})
    res.render('article/index', {article : article })
})

app.use('/article', articleRouter)

app.listen(5000)