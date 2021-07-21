require('dotenv').config()
const Express = require('express')
const db = require('./db')
const app = Express();

//Taylor
app.use(Express.json())
app.use(cors)

//base endpoint
app.get('/test', (req, res) => {
    res.json({
        message: "welcome to t4t"
    })
})

db.authenticate()
.then(() => db.sync())
// .then(() => db.sync({force: true}))
.then(() => app.listen( process.env.PORT, () => {
    console.log(`[t4t-server]: app listening on ${process.env.PORT}`)
}))

