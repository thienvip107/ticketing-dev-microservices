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