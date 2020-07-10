const API_URL = "http://localhost:3000/api/users/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getUserProfile(); 
    getUserIdParam(); 
}

const getUserIdParam = () => {
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
}

const getUserProfile = () => {
    const userId = getUserIdParam(); 
    const url = `${API_URL}${userId}`; 
    fetch(url, {
        method: 'GET'
    }).then((response) => {
        return response.json(); 
    }).then((data) => {
        buildProfile(data);
    });
}

const buildProfile = (data) => {
    document.getElementById("full-name").innerText = data.fullName; 
    document.getElementById("address").innerText = data.address['line1']; 
    document.getElementById("city").innerText = data.address['city'] + ","; 
    document.getElementById("state").innerText = data.address['state']; 
    document.getElementById("zipcode").innerText = data.address['zipcode']; 
}

function redirectToHistory() {
    const userId = getUserIdParam(); 
    const historyLink = `./history.html?id=${userId}`; 
    window.location.href = `${historyLink}`;
}
