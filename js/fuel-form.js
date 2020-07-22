const API_URL = "http://localhost:3000/api/users/";
const API_FORM_URL = "http://localhost:3000/api/users/form/";

window.onload = () => {
    getUserIdParam(); 
}

function getUserIdParam() {
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
}

// Set current price and company profit factor
let currentPrice = 1.5;
let profitFactor = 0.1;

// Get individual user's data
function getUserHistory() {
    const userId = getUserIdParam(); 
    const url = `${API_URL}${userId}`; 
    fetch(url, {
        method: 'GET'
    }).then((response) => {
        return response.json(); 
    }).then((data) => {
        pricingModule(data);
    });
}

const pricingModule = (user) => {
    // Set Location Factor depending on whether user is in- or out-of-state
    let state = user.address['state']; 
    let locationFactor; 
    if (state == 'TX' || state == 'tx') {
        locationFactor = (2/100); 
    } else {
        locationFactor = (4/100); 
    }
    
    // Set Rate History Factor depending on whether user has requested fuel before
    let historyFactor; 
    let historyList = user.history; 
    let count = 0; 
    for(entry of historyList) {
        count++;
    }
    if (count > 0) {
        historyFactor = (1/100); // if clent request fuel before
    } else {
        historyFactor = 0; //if no history
    }
    
    // Set Gallons Request Factor 
    let gallonFactor; 
    let gallons = document.getElementById("gallons").value; 
    // Check if all required fields have been filled in
    if ((gallons == "") || (date == "")) {
        error.style.opacity = 1; 
        return; 
    }
    if( gallons == 0)//if we get zero as gallon amount
    {
        error.style.opacity = 1; // we need a gallon amount to do the calculation. we can't proceed with zero gallon as entry. so we ask for a new entry again   
    }
    else if (gallons > 1000)  // checks wheter gallon amount is greater than 1000
    {      
        gallonFactor = (2/100);// if gallon amount greater than 1000. gallon request factor = 2%
    } 
    else // checks if gallon amount is less than 1000
    {
        gallonFactor = (3/100);// gallons factor is 3% if gallon amount less than 1000
    }

    // Calculate margin
    let margin = currentPrice * (locationFactor - historyFactor + gallonFactor + profitFactor); 
    margin.toFixed(5); 
    
    // Calculate Suggested price / gallon 
    // Display suggested price as read only 
    let suggestedPrice = currentPrice + margin; 
    document.getElementById("suggested-price-per-gallon").value = `$${suggestedPrice}`; 

    // Calculate total
    // Display total as currency
    let total = gallons * suggestedPrice; 
    total = total.toLocaleString("en-US", { 
        style: "currency", 
        currency: "USD"
    }); 
    document.getElementById("total").innerHTML = `${total}`; 
}

// Add new history entry 
function submitForm() {
    let total = document.getElementById("total").innerHTML; 
    let gallons = document.getElementById("gallons").value; 
    let deliveryDate = document.querySelector('input[type=date]').value;
    let suggestedPrice = document.getElementById("suggested-price-per-gallon").value; 

    let data = new FormData(); 
    data.append("total", total); 
    data.append("gallons", gallons); 
    data.append("deliveryDate", deliveryDate); 
    data.append("price", suggestedPrice); 

    const userId = getUserIdParam(); 
    const url = `${API_FORM_URL}${userId}`; 

    fetch(url, {
        method: 'PUT', 
        body: data
    }).then(() => {
        window.location.reload(); 
    })
}
