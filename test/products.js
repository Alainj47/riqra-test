'use stricts'

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

var agent = chai.request.agent(url)
describe('Fail Obtain products data without authToken: ',()=>{

	it('should receive an error because we need authToken', (done) => {
		agent
		    .get('/api/productos')
      	    .then(function (res) {
         		expect(res).to.have.status(500);
         		console.log(res.body)
      	});
		done();
	});

});


describe('get all products for user with Token', function() {
    var token = '';
  
    before(function(done) {
        chai.request(url)
        .post('/api/auth/login')
        .send({correo:"correo@test.com", password: "123456"})
        .end( function(err,res){
            console.log(res.body)
            token = res.body.token
            expect(res).to.have.status(200);
            done();
        });
    });
  
    it('should get all products for user', (done) => {
		chai.request(url)
			.get('/api/productos')
            .set('x-token', token)
			.end( function(err,res){
                console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});
  });
