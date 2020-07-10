
const API_URL = "http://localhost:3000/api/users/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getUserIdParam(); 
}

let userId; 

// Get userId to identify which user they are completing the profile fore
const getUserIdParam = () => {
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
}

function submit() {
    buildUserProfile();
}

const buildUserProfile = () => {
    userId = getUserIdParam(); 
    const url = `${API_URL}${userId}`; 

    let fullName = document.getElementById("full-name").value;
    let line1 = document.getElementById("address-1").value; 
    let line2 = document.getElementById("address-2").value; 
    let city = document.getElementById("city").value; 
    let state = document.getElementById("state").value; 
    let zipcode = document.getElementById("zipcode").value; 
    
    // If required fields aren't filled out, display error message
    if ((fullName == "") || (line1 == "") || (city == "") || (state == "State") || (zipcode.toString().length < 5)) {
        loginError.style.opacity = 1; 
        return; 
    }

    let data = new FormData(); 
    data.append("fullName", fullName);
    data.append("line1", line1); 
    data.append("line2", line2); 
    data.append("city", city); 
    data.append("state", state); 
    data.append("zipcode", zipcode);
    
    // PUT sends new data to update specific user
    fetch(url, {
        method: 'PUT', 
        body: data
    }).then(() => {
        setTimeout(() => {
            const profileLink = `./profile.html?id=${userId}`;
            window.location.href = `${profileLink}`;
        }, 1000)
    })
}

