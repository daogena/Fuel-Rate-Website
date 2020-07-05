const API_URL = "http://localhost:3000/api/users";
const API_BASE_URL = "http://localhost:3000/";

var username;
var password;
var loginError; 

// Login function is called when user clicks the login button 
function login() {
    // Gets user input for username and password
    username = document.getElementById("username-input").value;
    password = document.getElementById("password-input").value;
    loginError = document.getElementById("login-error-msg"); 
    getUsers();
}

// getUsers function fetches all users from API
// calls findUser to find a user that matches user input
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
    // Goes through database by each entry
    for (user of userList) {
        // If username and password match but fullName is empty, redirect user to complete their profile
        if (user.username == username && user.password == password && user.fullName == "") {
            const completeProfileLink = `./complete-profile.html?id=${user.username}`; 
            window.location.href = `${completeProfileLink}`
        }
        // If username and password match, redirect user to their profile
        else if (user.username == username && user.password == password) {
            const profileLink = `./profile.html?id=${user.username}`;
            window.location.href = `${profileLink}`;
        }
    }
    // If username or password don't match, show error message
    loginError.style.opacity = 1; 
}



