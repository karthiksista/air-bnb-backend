const express = require('express')
const app = express();
const mongoose = require('mongoose')
require('dotenv/config')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const cors = require('cors')
app.use(cors())
const list = require('./models/Lists')
const router = express.Router();
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const User = require('./models/user')
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('CONNECTED YO')
})

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Airbnb Api',
            version: '1.0.0',
            description: 'A list of all the Airbnb houses in the word',
        },
        servers: [
            {
                url: "http://localhost:4000"
            }
        ]
    },
    apis: ['./routes/*.js']
}

const specs = swaggerJsDoc(options)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
app.get('/', (req, res) => {
    res.send('YO NIGGA')
})
const listRoute = require('./routes/lists.js')
const countryRoute = require('./routes/country.js');
const Users = require('./models/user');

app.use('/lists', listRoute)
app.use('/country', countryRoute)

app.post('/register', async (req, res) => {
    let userData = req.body;
    let user = new Users(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send(registeredUser)
        }
    })
})

app.post('/login', async (req, res) => {
    let userData = req.body
    let message = await User.findOne({ email: userData.email })
    if (message !== null && message !== undefined) {
        return res.status(200).send(`LoggedIn Nigga ${userData.email}`)
    }
    return res.status(401).send(`Dont Sneak in nigga`)
})




app.listen(4000);