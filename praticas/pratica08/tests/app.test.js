const request = require('supertest');
const app = require('../app');

describe('API de Autenticação e Produtos', () => {
    let token;
    let novoToken;

    test('GET /produtos sem token deve retornar 401', async () => {
        const res = await request(app)
            .get('/produtos')
            .expect(401)
            .expect('Content-Type', /json/);
        
        expect(res.body).toHaveProperty('msg', 'Não autorizado');
    });

    test('GET /produtos com token inválido deve retornar 401', async () => {
        const res = await request(app)
            .get('/produtos')
            .set('Authorization', '123456789')
            .expect(401)
            .expect('Content-Type', /json/);
        
        expect(res.body).toHaveProperty('msg', 'Token inválido');
    });

    test('POST /usuarios/login deve retornar token', async () => {
        const res = await request(app)
            .post('/usuarios/login')
            .send({
                usuario: 'abobora@abobrinha.com',
                senha: 'abobrinha'
            })
            .expect(200)
            .expect('Content-Type', /json/);
        
        expect(res.body).toHaveProperty('token');
        token = res.body.token; 
    });

    test('GET /produtos com token válido deve retornar 200', async () => {
        const res = await request(app)
            .get('/produtos')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /json/);
        
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('POST /usuarios/renovar deve retornar novo token', async () => {
        const res = await request(app)
            .post('/usuarios/renovar')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /json/);
        
        expect(res.body).toHaveProperty('token');
        novoToken = res.body.token; 
    });

    test('GET /produtos com novo token deve retornar 200', async () => {
        const res = await request(app)
            .get('/produtos')
            .set('Authorization', `Bearer ${novoToken}`)
            .expect(200)
            .expect('Content-Type', /json/);
        
        expect(Array.isArray(res.body)).toBe(true);
    });
});