require('./database/mongo')
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const router = require('./config/routes')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(morgan('dev'))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(router)

app.listen(port)
