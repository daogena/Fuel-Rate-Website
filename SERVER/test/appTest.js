var app = require('../app'); 
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should(); 

describe("App", () => {
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
    it("should not get nonexistent user", (done) => {
        const id = "failUser"; 
        server
            .get(`/api/users/${id}`)
            .end((err, res) => {
                res.should.have.status(404);
                done(); 
            }) 
    });
    it("should update existing user", (done) => {
        const id = "user"; 
        let newUser = {
            "fullName": "Gena Dao"
        }; 
        server
            .put(`/api/users/${id}`)
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(200);
                done(); 
            })
    });
    it("should not update user not found", (done) => {
        const id = "sampleuser";
        let newUser = {
            "fullName": "Gena Dao"
        };
        server
            .put(`/api/users/${id}`)
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(404);
                done(); 
            }) 
    });
    it("should update history of existing user", (done) => {
        const id = "user"; 
        let newHistory = {
            "history": {
                "total": "$500", 
                "price": "$2"
            }
        };
        server
            .put(`/api/users/form/${id}`)
            .send(newHistory)
            .end((err, res) => {
                res.should.have.status(200); 
                done(); 
            })
    }); 
    it("should not update history of user not found", (done) => {
        const id = "sampleuser"; 
        let newHistory = {
            "history": {
                "total": "$500", 
                "price": "$2"
            }
        };
        server
            .put(`/api/users/form/${id}`)
            .send(newHistory)
            .end((err, res) => {
                res.should.have.status(404); 
                done(); 
            })
    });
    it("should return 200 status for correct password", (done) => {
        const id = "user"; 
        let user = {
            "username": "user", 
            "password": "pass"
        }; 
        server
            .post(`/api/users/${id}`)
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done(); 
            })
    });
    it("should return 404 status for incorrect password", (done) => {
        const id = "user"; 
        let user = {
            "username": "user", 
            "password": "incorrectpass"
        }; 
        server
            .post(`/api/users/${id}`)
            .send(user)
            .end((err, res) => {
                res.should.have.status(404);
                done(); 
            })
    });
    it("should add new user", (done) => {
        let newUser = {
            "username": "user"
        }; 
        server 
            .post('/api/users')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(201); 
                done(); 
            })
    });
});
