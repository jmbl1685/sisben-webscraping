'use strict'

const express = require('express')
const cors = require('cors')
const app = express()
const sisbenController = require('./controllers/sisben.controller')

require('dotenv').config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.set('port', process.env.PORT)
app.get('/sisben', sisbenController.SisbenWebScrapingHandle)

app.listen(app.get('port'), () => {
  console.log('Server running')
})

module.exports = app

