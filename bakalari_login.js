var overlay = document.createElement('div');
overlay.classList.add('overlay');

if (document.cookie.toString().length == 0) {
    createLoginForm();
}
else {
    creteForLoginForm();
}

async function creteForLoginForm() {
    document.body.insertBefore(overlay, document.body.firstChild);

    var loginForm = document.createElement('div');
    loginForm.classList.add('loginForm');
    overlay.appendChild(loginForm);

    var helloText = document.createElement('h1');
    helloText.textContent = "Hello";
    loginForm.appendChild(helloText);

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 -960 960 960");
    svg.setAttribute("height", "4vw");
    svg.style.display = 'inline-block';
    svg.style.padding = '3.5vw 2vw 0vw 2vw';

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z");
    svg.appendChild(path);
    loginForm.appendChild(svg);

    var cookies = document.cookie;
    cookies = cookies.split(';');
    for (let i = 0; i < cookies.length; i++) {
        cookie = cookies[i].split('=');
        cookies[i] = cookie[1].trim();
    }
    const userData = await verifyLogin(cookies[2], cookies[0], cookies[1]);

    var userWrapper = document.createElement('div');
    userWrapper.style.display = 'inline-block';
    userWrapper.style.verticalAlign = '2vw';
    loginForm.appendChild(userWrapper);

    var name = document.createElement('p');
    name.textContent = userData.FullUserName;
    name.style.margin = '0px';
    userWrapper.appendChild(name);

    var studyType = document.createElement('p');
    studyType.textContent = userData.UserTypeText + ", " + userData.Class.Abbrev;
    studyType.style.margin = '0px';
    userWrapper.appendChild(studyType);

    var cookieLbl = document.createElement('p');
    cookieLbl.textContent = 'How we use ';
    loginForm.appendChild(cookieLbl);

    var cookiesLink = document.createElement('a');
    cookiesLink.href = 'clarification.html';
    cookiesLink.textContent = 'cookies';
    cookiesLink.target = '_blank';
    cookieLbl.appendChild(cookiesLink);

    var changeBgBox = document.createElement('button');
    changeBgBox.style.width = '80%';
    changeBgBox.style.height = '15%';
    changeBgBox.style.backgroundImage = ('linear-gradient(to right, #514A9D, #24C6DC)');
    changeBgBox.style.border = 'none';
    changeBgBox.style.cursor = 'pointer';
    changeBgBox.style.borderRadius = '2vw';
    changeBgBox.margin = 'auto';
    loginForm.appendChild(changeBgBox);

    changeBgBox.onclick = function () {
        document.location.href = 'changeBackground.html';
    }

    var editbgsvg = document.createElement('svg');
    editbgsvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    editbgsvg.setAttribute("viewBox", "0 -960 960 960");
    editbgsvg.setAttribute("height", "3vw");
    editbgsvg.style.margin = 'auto';
    editbgsvg.style.display = 'block';
    editbgsvg.style.height = '-webkit-fill-available';

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z");
    editbgsvg.appendChild(path);

    changeBgBox.appendChild(editbgsvg);

    var bottomWrapper = document.createElement('div');
    bottomWrapper.style.margin = 'auto';
    bottomWrapper.style.marginTop = '3vw';
    bottomWrapper.style.textAlign = 'center';
    loginForm.appendChild(bottomWrapper);

    var backButton = document.createElement('button');
    backButton.classList.add('bottomBtn');
    backButton.textContent = 'Back';
    loginForm.appendChild(backButton);

    backButton.onclick = function () {
        closeLoginForm();
    }

    var logOutButton = document.createElement('button');
    logOutButton.classList.add('bottomBtn');
    logOutButton.textContent = 'Log out';
    loginForm.appendChild(logOutButton);

    logOutButton.onclick = function () {
        if (confirm("Do you really want to log out?") == true) {
            removeAllCookies();
            location.reload();
        }
    }
}

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
            confirmLogin(userData, username, password, schoolUrl);
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
            userData = await verifyLogin(schoolDropDown.options[schoolDropDown.selectedIndex].value, username, password);
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
                return responseArray[7];
            }
        }
        catch {
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

    try {
        if (userData.UserUID == null)
            throw new console.error();

        var text1 = document.createElement('p');
        text1.textContent = "Is this you?";
        text1.style.textAlign = 'left';
        text1.style.marginTop = '3vw';
        text1.style.paddingLeft = '2vw';
        text1.style.color = '#000000';
        loginForm.appendChild(text1);

        var name = document.createElement('p');
        name.textContent = userData.FullUserName;
        loginForm.appendChild(name);

        var studyType = document.createElement('p');
        studyType.textContent = userData.UserTypeText + ", " + userData.Class.Abbrev;
        loginForm.appendChild(studyType);

        var cookieLbl = document.createElement('label');
        cookieLbl.textContent = 'I agree to usage of ';
        loginForm.appendChild(cookieLbl);

        var cookiesLink = document.createElement('a');
        cookiesLink.href = 'clarification.html';
        cookiesLink.textContent = 'cookies';
        cookiesLink.target = '_blank';
        cookieLbl.appendChild(cookiesLink);


        var cookieCheck = document.createElement('input');
        cookieCheck.setAttribute('type', 'checkbox');
        cookieCheck.required = true;
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
    catch {
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
