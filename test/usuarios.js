'use stricts'

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('get all users: ',()=>{

	it('should get all users', (done) => {
		chai.request(url)
			.get('/api/usuarios')
			.end( function(err,res){
                console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});
});
