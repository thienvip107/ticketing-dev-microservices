import { response } from 'express';
import request from 'supertest'
import {app} from '../../app'

it('return a 201 on succesful signup', async () => {
	return request(app)
			.post('/api/users/signup')
			.send({
				email: 'tets@test.com',
				password: 'password'
			})
			.expect(201);
			
})

it('returns a 400 with an invalid email', async () => {
	return request(app)
			.post('/api/users/signup')
			.send({
				email: 'asldfsdf',
				password: 'password'
			})
			.expect(400)
})

it('disallows duuplicate emails', async () => {
	await request(app)
			.post('/api/users/signup')
			.send({
				email: 'test@test.com',
				password: 'password'
			})
			.expect(201)
	await request(app)
			.post('/api/users/signup')
			.send({
				email: 'test@test.com',
				password: 'password'
			})
			.expect(400)
})

it('sets a cookie after successful signup', async () => {
	const reponse = await request(app)
				.post('/api/users/signup')
				.send({
					email: 'test@test.com',
				password: 'password'
				})
				.expect(201)
	expect(reponse.get('Set-Cookie')).toBeDefined()
})