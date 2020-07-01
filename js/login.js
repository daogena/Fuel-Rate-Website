const API_URL = "http://localhost:3000/api/users";
const API_BASE_URL = "http://localhost:3000/";

var username;
var password;
var loginError; 

function login() {
    username = document.getElementById("username-input").value;
    password = document.getElementById("password-input").value;
    loginError = document.getElementById("login-error-msg"); 
    getUsers();
}

const getUsers = () => {
    fetch(API_URL, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        findUser(data);
    })
}

const findUser = (userList) => {
    for (user of userList) {
        if (user.username == username && user.password == password) {
            const profileLink = `./profile.html?id=${user.username}`;
            window.location.href = `${profileLink}`;
        }
    }
    loginError.style.opacity = 1; 
}



