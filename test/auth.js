'use stricts'

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';


describe('post login user: ',()=>{

	it('should post login users', (done) => {
		chai.request(url)
			.post('/api/auth/login')
            .send({correo:"correo@test.com", password: "123456"})
			.end( function(err,res){
                console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});
});
