const axios = require('axios');
const { expect } = require('chai');
const chai = require('chai');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
chai.use(require('chai-json-schema'));
const assert = chai.assert;
const getResponse = require('../api-method/get/response.json');
const getResponseSchema = require('../api-method/get/response.schema.json');
const postRequest = require('../api-method/post/request.json');
const postResponse = require('../api-method/post/response.json');
const deleteResponse = require('../api-method/delete/response.json')

describe('API testing', () => {

    it('GET request, assert response is equal & validate response against json schema', (done) => {
        (async () => {
            return await axios.get('https://jsonplaceholder.typicode.com/users');
        })()
            .then(response => {
                    assert.jsonSchema(response.data, getResponseSchema);
                    assert.equal(JSON.stringify(response.data), JSON.stringify(getResponse));
                    done();
            })
            .catch(error => {
                console.log(error);
            });
    })

    it('POST request and assert response', (done) => { 
        (async () => {
            return await axios.post('https://jsonplaceholder.typicode.com/users', postRequest);
        })()
            .then(response => {
                assert.equal(JSON.stringify(response.data), JSON.stringify(postResponse));
                done();
            })
            .catch(error => {
                console.log(error);
            });
    })

    it('DELETE request', (done) => {
        (async () => {
            return await axios.delete('https://jsonplaceholder.typicode.com/users/1');
        })()
            .then(response => {
                expect(response.status).to.be.equal(200);
                expect(response.config.method).to.be.equal('delete');
                expect(JSON.stringify(response.data)).to.be.equal(JSON.stringify(deleteResponse));
                done();
            })
            .catch(error => {
                console.log(error);
            });
    })

})


