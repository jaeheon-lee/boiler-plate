const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const config = require('./config/key')
const {
    User
} = require('./models/User.js')
const bodyParser = require('body-parser')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

//application/json
app.use(bodyParser.json())

mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => console.log('MongoDB Connected....'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/vote', (req, res) => {
    res.send('투표합시다.')
})

app.post('/register', (req, res) => {

    //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
    //그것들을  데이터 베이스에 넣어준다. 
    const user = new User(req.body)
    console.log(req.body)
    user.save((err, userInfo) => {
        console.log(userInfo)
        if (err) return res.json({
            success: false,
            err
        })
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})