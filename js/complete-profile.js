// Profile page javascript
function submit() {
    let fullName = document.getElementById("full-name").value;
    let address = document.getElementById("address-1").value; 
    let city = document.getElementById("city").value; 
    let state = document.getElementById("state").value; 
    let zipCode = document.getElementById("zipcode").value;
    let loginError = document.getElementById("login-error-msg"); 

    if ((fullName == "") || (address == "") || (city == "") || (state == "State") || (zipCode.toString().length < 5)) {
        loginError.style.opacity = 1; 
    }
    else {
        window.location.href = "profile.html";
    }
}
