import express, {Request, Response} from 'express'
import { body, validationResult } from 'express-validator'
import {RequestValidatorError, BadRequestError} from '@tian-ticketing/common'
import { User } from '../model/User'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post(
    '/api/users/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({min:4, max:20})
            .withMessage('Password must be between 4 and 20 characters')

    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            throw new RequestValidatorError(errors.array())
        }
		const {email, password} = req.body;

		const existingUser = await User.findOne({email})

		if(existingUser) {
			throw new BadRequestError('User already exist!');
		}

		const user = User.build({email, password})
		await user.save()
		console.log('User created success');
		const userJwt = jwt.sign(
			{
				id: user.id,
				email: user.email
			}, process.env.JWT_KEY!
		)

		req.session = {
			jwt: userJwt
		}
		
		res.status(201).send(user)
    }
)

export {router as signupRouter}