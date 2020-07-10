

const API_URL = "http://localhost:3000/api/users/";
const API_BASE_URL = "http://localhost:3000/";

var username = "placeholder";
var password = "placeholder";
var loginError; 

// Updates username and password by getting user input
function login() {
    username = document.getElementById("username-input").value; 
    password = document.getElementById("password-input").value;
    loginError = document.getElementById("login-error-msg"); 
    findUser(); 
}

// POSTs username and password to server to check if password entered matches encrypted password
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
        // If password doesn't match, display error message
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
    // If user just registered, redirect them to complete their profile
    if (user.fullName == "") {
        const completeProfileLink = `./complete-profile.html?id=${user.username}`; 
        window.location.href = `${completeProfileLink}`;
    } 
    // If profile has already been created, redirect user to their profile
    else {
        const profileLink = `./profile.html?id=${user.username}`;
        window.location.href = `${profileLink}`;
    }
}
