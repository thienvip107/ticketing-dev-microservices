import mongoose from 'mongoose'
import {app} from './app'

const start = async() => {
	if(!process.env.JWT_KEY) {
		throw new Error('JWT Secret need define')
	}
	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
		console.log('Connected database')
	} catch(err){
		console.log(err);
	}
	app.listen(3000, () => {
		console.log('Listening on port 3000!!!');
	})
}


start()