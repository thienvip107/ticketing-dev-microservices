import express, { json } from 'express'
import cookieSession from 'cookie-session'
import { currentUser, errorHandler, NotFoundError } from '@tian-ticketing/common'

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
)
app.use(currentUser)

app.all('*', async (req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }