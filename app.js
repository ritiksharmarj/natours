var $knI9B$axios = require("axios");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
const $f60945d37f8e594c$export$4c5dd147b21b9176 = (locations)=>{
    mapboxgl.accessToken = "pk.eyJ1IjoiZGV2cml0aWsiLCJhIjoiY2xpbXUybmg2MHVzbDNobW0xa2lsdTFndSJ9.V2iTPWHPHPK021uRJxqbPA";
    let map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        scrollZoom: false
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc)=>{
        // Create marker
        const el = document.createElement("div");
        el.className = "marker";
        // Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: "bottom"
        }).setLngLat(loc.coordinates).addTo(map);
        // Add popup
        new mapboxgl.Popup({
            offset: 30,
            closeOnClick: false,
            focusAfterOpen: false
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);
        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};



const $3adf927435cf4518$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const $3adf927435cf4518$export$de026b00723010c1 = (type, message)=>{
    // first hide all the alerts that already exists.
    $3adf927435cf4518$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${message}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    // hide all the alerts after 5 seconds.
    window.setTimeout($3adf927435cf4518$export$516836c6a9dfc573, 5000);
};


const $0e0246aa17379d59$export$596d806903d1f59e = async (email, password)=>{
    try {
        const response = await (0, ($parcel$interopDefault($knI9B$axios)))({
            method: "POST",
            url: "/api/v1/users/login",
            data: {
                email: email,
                password: password
            }
        });
        if (response.data.status === "success") {
            (0, $3adf927435cf4518$export$de026b00723010c1)("success", "Logged in successfully!");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1500);
        }
    } catch (error) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", error.response.data.message);
    }
};
const $0e0246aa17379d59$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const response = await (0, ($parcel$interopDefault($knI9B$axios)))({
            method: "GET",
            url: "/api/v1/users/logout"
        });
        // if (response.data.status === 'success') location.reload(true);
        if (response.data.status === "success") location.assign("/login");
    } catch (error) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", "Error logging out! Try again.");
    }
};




const $936fcc27ffb6bbb1$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type === "password" ? "/api/v1/users/updateMyPassword" : "/api/v1/users/updateMe";
        const response = await (0, ($parcel$interopDefault($knI9B$axios)))({
            method: "PATCH",
            url: url,
            data: data
        });
        if (response.data.status === "success") (0, $3adf927435cf4518$export$de026b00723010c1)("success", `${type.toUpperCase()} updated successfully!`);
    } catch (error) {
        (0, $3adf927435cf4518$export$de026b00723010c1)("error", error.response.data.message);
    }
};


// DOM ELEMENTS
const $d0f7ce18c37ad6f6$var$mapBox = document.getElementById("map");
const $d0f7ce18c37ad6f6$var$loginForm = document.querySelector(".form--login");
const $d0f7ce18c37ad6f6$var$logOutBtn = document.querySelector(".nav__el--logout");
const $d0f7ce18c37ad6f6$var$userDataForm = document.querySelector(".form-user-data");
const $d0f7ce18c37ad6f6$var$userPasswordForm = document.querySelector(".form-user-password");
// DELEGATION
if ($d0f7ce18c37ad6f6$var$mapBox) {
    const locations = JSON.parse($d0f7ce18c37ad6f6$var$mapBox.dataset.locations);
    (0, $f60945d37f8e594c$export$4c5dd147b21b9176)(locations);
}
if ($d0f7ce18c37ad6f6$var$loginForm) // Getting email and password from "/login" form
$d0f7ce18c37ad6f6$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, $0e0246aa17379d59$export$596d806903d1f59e)(email, password);
});
if ($d0f7ce18c37ad6f6$var$logOutBtn) $d0f7ce18c37ad6f6$var$logOutBtn.addEventListener("click", (0, $0e0246aa17379d59$export$a0973bcfe11b05c9));
if ($d0f7ce18c37ad6f6$var$userDataForm) $d0f7ce18c37ad6f6$var$userDataForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    (0, $936fcc27ffb6bbb1$export$f558026a994b6051)(form, "data");
});
if ($d0f7ce18c37ad6f6$var$userPasswordForm) $d0f7ce18c37ad6f6$var$userPasswordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await (0, $936fcc27ffb6bbb1$export$f558026a994b6051)({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, "password");
    document.querySelector(".btn--save-password").textContent = "Save password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
});


//# sourceMappingURL=app.js.map
