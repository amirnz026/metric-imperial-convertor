const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { response } = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  test('Convert a valid input such as 10L', function (done) {
    chai
      .request(server)
      .get('/api/convert?input=10L')
      .end((err, response) => {
        if (JSON.parse(response.text).returnNum == 2.64172) {
        }
        assert.equal(JSON.parse(response.text).returnNum, 2.64172);
        done();
      });
  });
  test('Convert an invalid input such as 32g', function (done) {
    chai
      .request(server)
      .get('/api/convert?input=32g')
      .end((err, response) => {
        assert.equal(response.text, 'invalid unit');
        done();
      });
  });
  test('Convert an invalid number such as 3/7.2/4kg', function (done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end((err, response) => {
        assert.equal(JSON.parse(response.text).returnNum, 0.229649);
        done();
      });
  });
  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', function (done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end((err, response) => {
        assert.equal(response.text, 'invalid unit');
        done();
      });
  });
  test('Convert with no number such as kg', function (done) {
    chai
      .request(server)
      .get('/api/convert?input=kg')
      .end((err, response) => {
        assert.equal(JSON.parse(response.text).initNum, 1);
        done();
      });
  });
});
