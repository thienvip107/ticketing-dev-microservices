import express, { json } from 'express'
import cookieSession from 'cookie-session'
import { currentUser, errorHandler, NotFoundError } from '@tian-ticketing/common'
import { createTicketRouter } from './routes/new'
import { indexTicketRouter } from './routes/index'
import { showTicketRouter } from './routes/show'
import { updateTicketRouter } from './routes/update'

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

app.use(indexTicketRouter)
app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(updateTicketRouter)

app.all('*', async (req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }