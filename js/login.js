// Login page javascript
function login() {
    var username = document.getElementById("username-input").value;
    var password = document.getElementById("password-input").value;
    var loginError = document.getElementById("login-error-msg"); 

    if (username == "user" && password == "pass") {
        alert("You have successfully logged in.");
    } else {
        loginError.style.opacity = 1; 
    }
}
