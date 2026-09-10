const API_URL = "https://script.google.com/macros/s/AKfycbzw18cFASV8ni2apNYYMQgnh1Sh61SyRPCr_iBNpCzl6rwx2PDVwKDj9j4mCh_0v4aCqg/exec";

async function loginAdmin() {

    let user = document.getElementById("adminUser").value.trim();
    let pass = document.getElementById("adminPass").value;


    const email = document.getElementById("adminUser").value.trim();
    const password = document.getElementById("adminPass").value.trim();

    // Check if fields are empty
    if (!email && !password) {
        document.getElementById("error").textContent =
            "Please enter your email and password.";
        return;
    }

    if (!email) {
        document.getElementById("error").textContent =
            "Please enter your email.";
        return;
    }

    if (!password) {
        document.getElementById("error").textContent =
            "Please enter your password.";
        return;
    }

    document.getElementById("error").textContent = "";


    try {

        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "login",
                username: user,
                password: pass,

            })
        });

        const result = await response.json();
        //*for blacking 
        if (result.success) {

            sessionStorage.setItem("admin", "true");
            sessionStorage.setItem("token", result.token);

            window.location.href = "allorder.html";

        } else {

            document.getElementById("error").textContent =
                result.message;

        }
        //*

        if (result.success) {

            document.getElementById("adminPanel").style.display = "block";
            loadProducts();

            alert("Login Successful");

        } else {

            alert(result.message);
            if (!result.success) {

                alert(result.message);
            }
        }

    } catch (err) {

        console.log(err);
        alert("Unable to connect to server.");

    }

}

/*log out*/

function logoutAdmin() {

    document.getElementById("adminPanel")
        .style.display = "none";

    document.getElementById("adminUser").value = "";
    document.getElementById("adminPass").value = "";
    document.getElementById("adminEmail").value = "";
    alert("Logged out");
}

/*geolocation*/
let map;
let marker;



function logoutAdmin() {

    if (!navigator.geolocation) {

        alert("Geolocation not supported");

        return;

    }

    document.getElementById("status").innerHTML = "Getting GPS...";

    navigator.geolocation.getCurrentPosition(

        success,

        error,

        {

            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 0

        }

    );

}

async function success(position) {

    const lat = position.coords.latitude;

    const lng = position.coords.longitude;

    const acc = position.coords.accuracy;

    document.getElementById("status").innerHTML = "Success";

    document.getElementById("lat").innerHTML = lat;

    document.getElementById("lng").innerHTML = lng;

    document.getElementById("accuracy").innerHTML = acc + " meters";

    map = new google.maps.Map(document.getElementById("map"), {

        center: { lat: lat, lng: lng },

        zoom: 18

    });

    marker = new google.maps.Marker({

        position: { lat: lat, lng: lng },

        map: map

    });

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_API_KEY`;

    const response = await fetch(url);

    const data = await response.json();

    if (data.status === "OK") {

        document.getElementById("address").innerHTML =

            data.results[0].formatted_address;

    } else {

        document.getElementById("address").innerHTML =

            "Address not found";

    }

}

function error(err) {

    document.getElementById("status").innerHTML =

        err.message;

}