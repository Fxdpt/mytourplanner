import "reflect-metadata";
import { createConnection } from "typeorm"

const express = require('express')
const cors = require('cors')
const app = express()
const expressJWT = require('express-jwt')

require('dotenv').config()

const PORT = process.env.PORT || 5000

// TODO: Implement Sanitize
app.use(cors())
app.use(express.json())
app.use(expressJWT(
    { secret: process.env.JWT_PASSPHRASE })
    .unless( req =>{
        return(
            req.originalUrl === '/login' ||
            req.originalUrl === '/users' && req.method === 'POST'
        )
        
    })
)

const userRoutes = require('./routes/api/User')
const bandRoutes = require('./routes/api/Band')
const placeRoutes = require('./routes/api/Place')
const eventRoutes = require('./routes/api/Event')
const securityRoutes = require('./routes/security/Security')

app.use('/users', userRoutes)
app.use('/bands', bandRoutes)
app.use('/places', placeRoutes)
app.use('/events', eventRoutes)
app.use('/', securityRoutes)

app.listen(PORT, () => {
    createConnection()
        .then(() => console.log('Database connected'))
        .catch(error => console.log(error))
    console.log(`Server running on port ${PORT}`)
})