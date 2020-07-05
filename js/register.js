// Registration page javascript

const API_URL = "http://localhost:3000/api/users";

const registerUser = () => {
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    const confirmed = document.getElementById("confirm-password-input").value; 
    var loginError = document.getElementById("login-error-msg"); 

    if (password != confirmed) {
        loginError.style.opacity = 1; 
    } else {
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

}
