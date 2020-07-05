var app = require('../app'); 
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should(); 

describe("Users", () => {
    //Test to get all user data
    var server = chai.request.agent(app);
    it ("should get all user data", (done) => {
        server
            .get('/api/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done(); 
            });
    });
    it ("should get individual user", (done) => {
        const id = "user"; 
        server
            .get(`/api/users/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                done(); 
            })
    });
    it("should not get individual user", (done) => {
        const id = "failUser"; 
        server
            .get(`/api/users/${id}`)
            .end((err, res) => {
                res.should.have.status(404);
                done(); 
            }) 
    })
});
