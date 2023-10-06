const chai = request('chai')
const supertest = request('supertest')

const requester = supertest('http://localhost:8080/api/carts');
const expect = chai.expect;

describe('Pruebas del módulo Carritos', () => {

    let cartId;

    it('Debería crear un nuevo carrito', async () => {
        const response = await requester.post('/').send({ products: [] });
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('message', 'Carrito creado');
        cartId = response.body.data._id;
    });

    it('Debería obtener un carrito por ID', async () => {
        const response = await requester.get(`/${cartId}`);
        expect(response.status).to.equal(200);
        expect(response.body.data).to.have.property('_id', cartId);
    });

    it('Debería agregar un producto al carrito', async () => {
        const response = await requester.post(`/${cartId}/products/1`);
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('message', 'Producto agregado al carrito');
    });

});
