const chai = require('chai');
const supertest = require('supertest');

const requester = supertest('http://localhost:8080/api/sessions');
const expect = chai.expect;

describe('Pruebas del módulo Sesiones', () => {

    let user = {
        email: "testuser@example.com",
        password: "testpassword",
        first_name: "Test",
        last_name: "User"
    };


    it('Debería iniciar sesión con el usuario', async () => {
        const response = await requester.post('/login').send({
            email: user.email,
            password: user.password
        });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status', 'success');
        expect(response.body).to.have.property('message', 'Logueado satisfactoriamente!');
    });

    it('Debería obtener información del usuario actual', async () => {
        const response = await requester.get('/current');
        if (response.status === 401) {
            expect(response.body).to.have.property('error', 'No hay usuario autenticado');
        } else {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('user');
            expect(response.body.user).to.have.property('email', user.email);
        }
    });
});
