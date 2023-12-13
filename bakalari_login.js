var overlay = document.createElement('div');
overlay.classList.add('overlay');

createLoginForm();

function createLoginForm() {
    var loginForm = document.createElement('div');
    loginForm.classList.add('loginForm');
    overlay.appendChild(loginForm);
    var loginText = document.createElement('div');
    loginText.textContent = "Log into Bakalari";
    loginText.style.fontSize = '2.5vw';
    loginText.style.margin = '2vw';
    loginText.style.color = '#387aa5';
    loginForm.appendChild(loginText);

    //add username
    var usernameLbl = document.createElement('label');
    usernameLbl.classList.add('label');
    usernameLbl.textContent = 'Username: ';
    var usernameInp = document.createElement('input');
    usernameInp.classList.add('input');
    usernameInp.type = 'text';
    usernameInp.id = 'username';
    usernameInp.name = 'username';
    usernameInp.required = true;

    loginForm.appendChild(usernameLbl);
    loginForm.appendChild(usernameInp);

    //add password
    var passwordLbl = document.createElement('label');
    passwordLbl.textContent = 'Password: ';
    passwordLbl.classList.add('label');
    var passwordInp = document.createElement('input');
    passwordInp.classList.add('input');
    passwordInp.type = 'password';
    passwordInp.id = 'password';
    passwordInp.name = 'password';
    passwordInp.required = true;

    loginForm.appendChild(passwordLbl);
    loginForm.appendChild(passwordInp);

    //add submit button
    var submitButton = document.createElement('button');
    submitButton.textContent = 'Next';
    submitButton.classList.add('submitButton');
    submitButton.type = 'button';

    loginForm.appendChild(submitButton);
    document.body.insertBefore(overlay, document.body.firstChild);

    submitButton.onclick = async function () {
        if (usernameInp.value != "" && passwordInp.value != "") {
            usernameLbl.remove();
            usernameInp.remove();
            passwordLbl.remove();
            passwordInp.remove();
            selectCity(usernameInp.value, passwordInp.value);
        }
    };
}

async function selectCity(username, password) {
    var loginForm = document.querySelector("body > div.overlay > div");
    var submitButton = document.querySelector("body > div.overlay > div > button");
    var schoolUrl = "";
    var userData;

    //create a dropdown menu for cities
    var schoolDropDown = document.createElement("select");
    schoolDropDown.classList.add('DdMenu');
    loginForm.insertBefore(schoolDropDown, submitButton);

    var schoolPlaceholder = document.createElement('option');
    schoolPlaceholder.textContent = "";
    schoolPlaceholder.value = "";
    schoolDropDown.appendChild(schoolPlaceholder);

    schoolLbl = document.createElement('label');
    schoolLbl.textContent = 'Select a School';
    schoolLbl.classList.add('label');
    loginForm.insertBefore(schoolLbl, schoolDropDown);

    var cityDropDown = document.createElement("select");
    cityDropDown.classList.add('DdMenu');
    loginForm.insertBefore(cityDropDown, schoolLbl);

    var cityPlaceholder = document.createElement('option');
    cityPlaceholder.textContent = ""
    cityPlaceholder.value = ""
    cityDropDown.appendChild(cityPlaceholder);

    cityLbl = document.createElement('label');
    cityLbl.textContent = 'Select a city';
    cityLbl.classList.add('label');
    loginForm.insertBefore(cityLbl, cityDropDown);

    var backButton = document.createElement('button');
    backButton.classList.add('submitButton');
    backButton.style.width = '39%';
    backButton.style.float = 'left';
    backButton.textContent = 'back';
    backButton.style.marginLeft = '2.5vw';
    backButton.onclick = function () {
        document.querySelector("body > div.overlay > div").remove();
        createLoginForm();
    }
    loginForm.insertBefore(backButton, submitButton);

    submitButton.style.width = '39%'
    submitButton.style.float = 'right';
    submitButton.style.marginRight = '2.5vw';
    submitButton.onclick = function () {
        if (cityDropDown.value != "" && schoolDropDown.value != "") {
            schoolUrl = loginForm.children[4].options[loginForm.children[4].selectedIndex].value;
            confirmLogin(userData, password, schoolUrl);
        }
    };
    submitButton.textContent = 'Next';
    submitButton.type = 'button';
    cityDropDown.focus();

    //fill the menu with cities
    const cities = await getCities();
    cities.shift();
    var filter = cities;
    cities.forEach(item => {
        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        cityDropDown.appendChild(option);
    });
    cityDropDown.addEventListener("change", async function () {
        if (cityDropDown.options[cityDropDown.selectedIndex].value != "")
            selectSchool(cityDropDown, schoolDropDown);
    });
    schoolDropDown.addEventListener("change", async function () {
        if (schoolDropDown.options[schoolDropDown.selectedIndex].value != "")
            userData = verifyLogin(schoolDropDown.options[schoolDropDown.selectedIndex].value, username, password);
    })
}

async function selectSchool(cityDropDown, schoolDropDown) {
    var city = cityDropDown.options[cityDropDown.selectedIndex].value;
    //fill the menu with schools
    var schools = await getSchools(city.trim());
    schools = schools.schools;
    schools.forEach(school => {
        const option = document.createElement("option");
        option.value = school.schoolUrl;
        option.text = school.name;
        schoolDropDown.appendChild(option);
    });
}

async function verifyLogin(schoolUrl, username, password) {
    const token = await getToken();
    const url = schoolUrl + '/api/3/user?hx=$' + token;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token
            },
        });
        if (response.ok) {
            const userData = await response.json();
            return userData;
        }
    }
    catch {
        return null;
    }

    async function getToken() {
        try {
            var url = schoolUrl + 'api/login';
            
            const body = new URLSearchParams();
            body.append('client_id', 'ANDR');
            body.append('grant_type', 'password');
            body.append('username', username);
            body.append('password', password);

            const response = await fetch(url, {
                method: 'POST',
                body: body,
            });

            if (response.ok) {
                const responseBody = await response.text();
                const responseArray = responseBody.split('"');
                console.log(responseArray[7]);
                return responseArray[7];
            }
        }
        catch {
            console.log("unable to get token");
            return;
        }
    }
}

function confirmLogin(userData, username, password, schoolUrl) {
    var loginForm = document.querySelector("body > div.overlay > div");
    loginForm.replaceChildren();
    var loginText = document.createElement('div');
    loginText.textContent = "Log into Bakalari";
    loginText.style.fontSize = '2.5vw';
    loginText.style.margin = '2vw';
    loginText.style.color = '#387aa5';
    loginForm.appendChild(loginText);
    var isSuccessfull;

    if (userData == null)
        isSuccessfull = false;

    if (isSuccessfull) {
        var text1 = document.createElement('p');
        text1.textContent = "Is this you?";
        text1.style.textAlign = 'left'
        text1.style.paddingLeft = '2vw';
        text1.style.color = '#000000';
        loginForm.appendChild(text1);

        var studyType = document.createElement('p');
        studyType.textContent = userData.UserTypeText + ", " + userData.Class.Abbrev;
        loginForm.appendChild(studyType);

        var name = document.createElement('p');
        name.textContent = userData.FullUserName;
        loginForm.appendChild(name);

        var cookieLbl = document.createElement('label');
        cookieLbl.textContent = 'I agree to usage of cookies';
        loginForm.appendChild(cookieLbl);

        var cookieCheck = document.createElement('input');
        cookieCheck.setAttribute('type', 'checkbox');
        loginForm.appendChild(cookieCheck);

        var loginButton = document.createElement('button');
        loginButton.classList.add('submitButton');
        loginButton.textContent = 'Log in';
        loginForm.appendChild(loginButton);

        loginButton.onclick = function () {
            if (cookieCheck.checked) {
                removeAllCookies();
                setCookie("username", username);
                setCookie("password", password);
                setCookie("url", schoolUrl);
                location.reload();
            }
        }
    }
    else {
        var text1 = document.createElement('p');
        text1.textContent = "error: profile not found";
        text1.style.textAlign = 'left'
        text1.style.paddingLeft = '2vw';
        text1.style.color = '#000000';
        loginForm.appendChild(text1);

        var backButton = document.createElement('button');
        backButton.classList.add('submitButton');
        backButton.textContent = 'Back';
        backButton.focus();
        loginForm.appendChild(backButton);;

        backButton.onclick = function () {
            document.querySelector("body > div.overlay > div").remove();
            createLoginForm();
        }
    }
}

async function getCities() {
    const url = 'https://cors.iamnd.eu.org/?url=https://sluzby.bakalari.cz/api/v1/municipality';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    if (response.ok) {
        return await response.json();
    }
}

async function getSchools(city) {
    city = encodeURIComponent(city);
    const cors = 'https://cors.iamnd.eu.org/?url=';
    const apiUrl = 'https://sluzby.bakalari.cz/api/v1/municipality/';
    const url = cors + encodeURIComponent(apiUrl + city);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    if (response.ok) {
        return await response.json();
    }
};

document.addEventListener('click', function (event) {
    if (event.target === overlay) {
        closeLoginForm();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeLoginForm();
    }
});

function closeLoginForm() {
    overlay.remove();
    document.removeEventListener('click', closeLoginForm);
    document.removeEventListener('keydown', closeLoginForm);
    document.removeEventListener("change", closeLoginForm);
}

function removeAllCookies() {
    const cookies = document.cookie.split(';');

    cookies.forEach(cookie => {
        const parts = cookie.split('=');
        const cookieName = parts[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
}

function setCookie(name, value) {
    var date = new Date();
    date.setFullYear(date.getFullYear() + 4);
    expires = "; expires=" + date.toUTCString();

    document.cookie = name + "=" + value + expires + "; path=/";
}
