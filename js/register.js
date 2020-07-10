// Registration page javascript

const API_URL = "http://localhost:3000/api/users";

var username; 
var password; 

const registerUser = () => {
    username = document.getElementById("username-input").value;
    password = document.getElementById("password-input").value;
    const confirmed = document.getElementById("confirm-password-input").value; 
    var loginError = document.getElementById("login-error-msg"); 
    var loginError2 = document.getElementById("login-error-msg-2"); 

    fetch(API_URL, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        // If username entered is already in use, display error message
        if (checkUsers(username, data) == false) {
            loginError2.style.opacity = 1; 
        }
        // If passwords don't match, display error message
        else if (password != confirmed) {
            loginError.style.opacity = 1; 
        } 
        else {
            addNewUser(username, password); 
        }
    }) 
}

// Check if entered username is already in database
const checkUsers = (username, userList) => {
    for (user of userList) {
        if (user.username == username) {
            return false; 
        }
    }
    return true; 
}

// Create new data entry for new user
const addNewUser = (username, password) => {
    let data = new FormData(); 
    data.append("username", username);
    data.append("password", password);

    fetch(API_URL, {
        method: 'POST',  
        body: data
    }).then(() => {
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000)
    })
}
