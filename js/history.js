// Fuel quote history javascript
const API_URL = "http://localhost:3000/api/users/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getUserHistory(); 
    getUserIdParam(); 
}

function getUserIdParam() {
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
}

function getUserHistory() {
    const userId = getUserIdParam(); 
    const url = `${API_URL}${userId}`; 
    fetch(url, {
        method: 'GET'
    }).then((response) => {
        return response.json(); 
    }).then((data) => {
        buildHistory(data);
    });
}

const buildHistory = (user) => {
    let historyContent = "";
    let address = user.address['line1'];
    let historyList = user.history; 
    for(entry of historyList) {
        historyContent += `
        <div class="history-item history-entry">
            <div class="history-item-content">
                <div class="total">
                    <div class="label">Total:</div>
                    <div class="value">${entry.total}</div>
                </div>
                <div class="gallons">
                    <div class="label">Gallons requested:</div>
                    <div class="value">${entry.gallons}</div>
                </div>
                <div class="delivery-address">
                    <div class="label">Delivery address:</div> 
                    <div class="value">${address}</div>
                </div>
                <div class="delivery-date">
                    <div class="label">Delivery date:</div>
                    <div class="value">${entry.deliveryDate}</div>
                </div>
                <div class="suggested-price-per-gallon">
                    <div class="label">Price/gallon:</div>
                    <div class="value">${entry.price}</div>
                </div>
            </div>
        </div>
        `;
    }
    document.querySelector('.history-entry').innerHTML = historyContent; 
}
