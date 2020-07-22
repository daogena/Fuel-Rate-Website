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
    let gallons_valid = false; // holds true/false if a valid input for gallons was received. initially set to false to help with do-while loop
    
    do 
    {
        let gallons = document.getElementById("gallons").value; 
        let gallonFactor; 

        if( gallon == 0)//if we get zero as gallon amount
        {
            gallons_valid = false; // we need a gallon amount to do the calculation. we can't proceed with zero gallon as entry. so we ask for a new entry again   
        }
        else if (gallons > 1000)  // checks wheter gallon amount is greater than 1000
        {      
            gallonFactor = (2/100);// if gallon amount greater than 1000. gallon request factor = 2%
            gallons_valid = true; // we have a valid input for gallon. helps exist do-while loop
        } 
        else if (gallons < 1000) // checks if gallon amount is less than 1000
        {
            gallonFactor = (3/100);// gallons factor is 3% if gallon amount less than 1000
            gallons_valid = true; //we have a valid input for gallon. we set this to true to help exit do-while loop
        }
        else // if the gallon entry is not less 1000, or greater than 1000, or at equal 0. then we most likely have a non-sensible entry which can cause damage to our program
        {
                gallons_valid = false;// we most likely have a nonsible entry then. and so the input is not valid
        }

    }while(gallons_valid == false)// we repeatidly attemp to set the gallon factor untill we get a valid input.

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
