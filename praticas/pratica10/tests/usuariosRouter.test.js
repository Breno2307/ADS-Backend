const request = require('supertest');
const app = require('../app');

describe('Recurso /usuarios', () => {
  let userId;
  let token;

  test('POST /usuarios deve criar um usuário e retornar status 201', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send({ email: 'usuario@email.com', senha: 'abcd1234' })
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.email).toBe('usuario@email.com');
    
    userId = response.body._id;
  });

  test('POST /usuarios sem JSON deve retornar status 422', async () => {
    const response = await request(app)
      .post('/usuarios')
      .expect(422)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('msg', 'Email e Senha são obrigatórios');
  });

  test('POST /usuarios/login deve retornar token com status 200', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .send({ usuario: 'usuario@email.com', senha: 'abcd1234' })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('token');
    
    token = response.body.token;
  });

  test('POST /usuarios/login sem JSON deve retornar status 401', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .expect(401)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('msg', 'Credenciais inválidas');
  });

  test('POST /usuarios/renovar com token válido deve retornar novo token', async () => {
    const response = await request(app)
      .post('/usuarios/renovar')
      .set('authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('token');
  });

  test('POST /usuarios/renovar com token inválido deve retornar status 401', async () => {
    const response = await request(app)
      .post('/usuarios/renovar')
      .set('authorization', 'Bearer 123456789')
      .expect(401)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('msg', 'Token inválido');
  });

  test('DELETE /usuarios com token válido deve retornar status 204', async () => {
    await request(app)
      .delete('/usuarios/')
      .set('authorization', `Bearer ${token}`)
      .send({ usuario: 'usuario@email.com' })
      .expect(204);
  });
});