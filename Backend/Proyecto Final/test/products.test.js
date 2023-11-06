const chai = require('chai');
const supertest = require('supertest');

const requester = supertest('http://localhost:8080/api/products');
const expect = chai.expect;

describe('Pruebas del módulo Productos', () => {

    it('Debería obtener todos los productos', async () => {
        const response = await requester.get('/');
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status', 'success');
        expect(response.body).to.have.property('payload');
    });

    it('Debería obtener un producto por ID', async () => {
        const staticProductId = '64a76181d7abdd39b78b32ce';
        const response = await requester.get(`/${staticProductId}`);

        if (response.status === 404) {
            expect(response.body).to.have.property('message', 'No se encontró el producto');
        } else {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('_id', staticProductId);
        }
    });
});
