

const API_URL = "http://localhost:3000/api/users/";
const API_BASE_URL = "http://localhost:3000/";

var username = "placeholder";
var password = "placeholder";
var loginError; 

function login() {
    username = document.getElementById("username-input").value; 
    password = document.getElementById("password-input").value;
    loginError = document.getElementById("login-error-msg"); 
    findUser(); 
}

function findUser() {
    let data = new FormData(); 
    data.append("username", username); 
    data.append("password", password); 

    const url = `${API_URL}${username}`; 
    fetch(url, {
        method: 'POST', 
        body: data
    }).then((response) => {
        if (response.status == 200) {
            getUser(); 
        }
        else {
            loginError.style.opacity = 1; 
        }
    })
}

function getUser() {
    const url = `${API_URL}${username}`;  
    fetch(url, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        redirectUser(data);
    })
}

function redirectUser(user) {
    if (user.fullName == "") {
        const completeProfileLink = `./complete-profile.html?id=${user.username}`; 
        window.location.href = `${completeProfileLink}`;
    } 
    else {
        const profileLink = `./profile.html?id=${user.username}`;
        window.location.href = `${profileLink}`;
    }
}
