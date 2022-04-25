import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  test('Should returns an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Luiz',
        email: 'luiz@email.com',
        password: '1234',
        password_confirmation: '1234'
      })
      .expect(200)
  })
})
