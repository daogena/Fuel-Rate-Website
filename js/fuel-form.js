// Fuel form javascript
function calculate() {
    let gallons = document.getElementById("gallons").value; 
    let date = document.querySelector('input[type=date]');
    let loginError = document.getElementById("login-error-msg"); 
    let priceInString = document.getElementById("suggested-price-per-gallon").value.substring(1); 
    let price = parseInt(priceInString, 10);

    if ((gallons == "")  || (date.value == "")) {
        loginError.style.opacity = 1; 
    } else {
        let total = gallons * price; 
        document.getElementById("total").innerHTML = "$" + total; 
    }
}
