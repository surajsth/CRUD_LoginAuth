require('dotenv').config()
const express = require('express')
const app = express()
const userRouter = require("./api/users/user.router")
const logger = require("./config/logger")

app.use(express.json())
// app.get('/api', (req, res) => {
//     res.json({
//         success: 1,
//         message: 'hello Server, is this working'
//     })
// })

app.use((req, res, next) => {
    logger.info(req.body)
    let oldSend = res.send;
    res.send = function (data) {
        logger.info(JSON.parse(data))
        oldSend.apply(res, arguments)
    }
    next()
})

const port = 5000
app.use("/api/users", userRouter)


app.listen(port, () => {
    logger.error('info', `Server is running hai at ${port}`)
})