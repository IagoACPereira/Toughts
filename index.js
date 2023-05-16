const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()
const port = 3000
const conn = require('./db/conn')

// Models
const Tought = require('./models/Tought')
const User = require('./models/User')

// Template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Receber resposta do body
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

// Session middleware (salvar arquivos de seção)
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',  // Quanto mais forte melhor
        resave: false,
        saveUninitialize: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000)
        }
    })
)

// Flash message
app.use(flash())

// Public path
app.use(express.static('public'))

// Set session to
app.use((req, res, next) => {
    if(req.session.userid) {
        res.locals.session = req.session
    }

    next()
})

conn
    .sync()
    .then(() => {
        app.listen(port)
    })
    .catch((err) => console.log(err))