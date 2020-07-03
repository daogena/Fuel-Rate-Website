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

class pricingModule
{
	this.gallonReqested = 0;
	this.address = 0;
	this.priceGallon = 0;
	this.total = 0;

	//functions
	getGallonRequested = funtion(x) {
		this.address = x
	};

	this.getAddress = function(x) {

		this.address = x

	};

	this.getPrice = function(x) { // this stores the price per gallon
		this.priceGallon = x
	};

	this.calTotal = function(gallonreq, priceGallon) {

		return this.gallonRequested * this.priceGallon; // retrun the result. the gallon requested times the price per gallon
	};


	this.display = function(x) {

	}; //this function displays all the information colleccted; gallon requested, address, price, and calcultios
};
