var User = require('../api/models/users');
var chai = require('chai');
var expect = chai.expect; 
const user = new User(); 

chai.should(); 

describe("User class", () => {
    it('get function should get data', () => {
        let result = user.get(); 
        result.should.be.an('array');
    });
    it('getIndividualUser function should get user', () => {
        let userId = "user";
        let result = user.getIndividualUser(userId); 
        result.should.be.an('object');
    });
    it('add function should return undefined', () => {
        let newUser = "username";
        let result = user.add(newUser);
        expect(result).to.be.an('undefined');
    });
    it('update function should return undefined', () => {
        let userId = "user"; 
        let newUser = "username"; 
        let result = user.update(userId, newUser); 
        expect(result).to.be.an('undefined');
    })
    it('readData function should read data', () => {
        let result = user.readData(); 
        result.should.be.an('array');
    });
});
