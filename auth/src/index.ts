import express from 'express';
import { json } from 'body-parser'
import 'express-async-errors'

import {currentUserRouter} from './routes/current-user'
import {signinRouter} from './routes/signin'
import {signoutRouter} from './routes/signout'
import {signupRouter} from './routes/signup'
import {errorHandler} from './middlewares/eror-handler'
import {NotFoundError} from './errors/not-found-error'

const app = express()
app.use(json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async(req, res) => {
    throw new NotFoundError()
})

app.get('/api/users/currentuser',
 (req, res) => {
    res.send('Hi there');
})
app.use(errorHandler)

app.listen(3000, () => {
    console.log('Listening on port 3000!!!');
})