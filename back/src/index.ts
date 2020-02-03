import "reflect-metadata";
import { createConnection } from "typeorm"

const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const userRoutes = require('./routes/api/User')
const bandRoutes = require('./routes/api/Band')
const placeRoutes = require('./routes/api/Place')
const eventRoutes = require('./routes/api/Event')
app.use('/users', userRoutes)
app.use('/bands', bandRoutes)
app.use('/places', placeRoutes)
app.use('/events', eventRoutes)

app.listen(PORT, () => {
    createConnection()
        .then(() => console.log('Database connected'))
        .catch(error => console.log(error))
    console.log(`Server running on port ${PORT}`)
})