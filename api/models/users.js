const PATH = "./data.json"; 
const fs = require('fs');


class User {
    get() {
        // Get users
        return this.readData(); 
    }

    getIndividualUser(userId) {
        // Get one user
        const users = this.readData();
        const foundUser = users.find((user) => user.username == userId); 
        return foundUser; 
    }

    add(newUser) {
        // Add new user
        const currentUsers = this.readData(); 
        currentUsers.unshift(newUser);
        this.storeData(currentUsers);
    }

    readData() {
        let rawdata = fs.readFileSync(PATH);
        let users = JSON.parse(rawdata);
        return users; 
    }

    storeData(rawData) {
        let data = JSON.stringify(rawData);
        fs.writeFileSync(PATH, data);
    }
}

module.exports = User; 