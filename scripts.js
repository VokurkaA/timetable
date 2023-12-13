document.addEventListener("DOMContentLoaded", function () {
    printDate();
    printLogin();
    printTimeTable();
});
function printLogin() {
    var button = document.createElement("button");
    button.onclick = function () {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "./bakalari_login.js";
        button.appendChild(script);
    };

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 -960 960 960");

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z");
    svg.appendChild(path);
    button.appendChild(svg)
    button.classList.add('login-btn');
    document.body.appendChild(button);
}

async function printTimeTable() {
    var cookies = document.cookie;
    if (document.cookie == "")
        return;

    cookies = cookies.split(';');
    for (let i = 0; i < cookies.length; i++) {
        cookie = cookies[i].split('=');
        cookies[i] = cookie[1].trim();
    }

    const token = await getToken(cookies[0], cookies[1], cookies[2]);
    const ttData = await getTimeTable(cookies[2], token);

    var lessonAbr = getLsnAbr(ttData.Subjects);
    let firstLsnId = getTotalFirst(ttData.Days);
    let lastLsnId = getTotalLateLst(ttData.Days);
    let amountDays = 5;

    //create a grid
    var container = document.createElement('div');
    container.classList.add('content-container');
    container.style.gridTemplateRows = `repeat(${amountDays + 1}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${lastLsnId - firstLsnId + 1}, 1fr)`;
    document.body.appendChild(container);

    //print out Timetable
    var abbrevDays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sut", "Sun"];
    createSubject(1, 1, "");
    for (var i = 0; i < lastLsnId - firstLsnId + 1; i++) {
        createSubject(1, i + 2, i + 1);
    }
    for (var i = 0; i < amountDays; i++) {
        const day = ttData.Days[i].Atoms;
        createSubject(i + 2, 1, abbrevDays[i]);
        let lastHourId = day[0].HourId - 1;
        let adition = 0;
        for (var j = 0; j < getLastLsn(day) - getFirstLsn(day) + 1 - adition; j++) {
            if (day[j].HourId != lastHourId + 1) {
                createSubject(i + 2, j + 2 + adition, "");
                adition++;
            }
            createSubject(i + 2, j + 2 + adition, lessonAbr[day[j].SubjectId.trim()])
            lastHourId = day[j].HourId;
        }
    }

    function createSubject(row, column, text) {
        var gridItem = document.createElement('div');
        gridItem.classList.add('subject');
        gridItem.style.gridRow = row;
        gridItem.style.gridColumn = column;
        gridItem.textContent = text;
        container.appendChild(gridItem);
    }
    function getLastLsn(day) {
        return day[day.length - 1].HourId;
    }
    function getTotalLateLst(days) {
        let lastLsn = 0;
        days.forEach(day => {
            let lsn = getLastLsn(day.Atoms)
            if (lsn > lastLsn)
                lastLsn = lsn;
        });
        return lastLsn;
    }
    function getFirstLsn(day) {
        return day[0].HourId;
    }
    function getTotalFirst(days) {
        let firstLsnId = days[0].Atoms[0].HourId;
        days.forEach(day => {
            let lsn = getFirstLsn(day.Atoms)
            if (lsn < firstLsnId)
                firstLsnId = lsn;
        });
        return firstLsnId;
    }
    function getLsnAbr(subjects) {
        var lessonAbr = new Object();
        subjects.forEach(subject => {
            lessonAbr[subject.Id.trim()] = subject.Abbrev.trim();
        });
        return lessonAbr;
    }

}

function printDate() {
    var body = document.body;
    var crntDate = new Date();
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var date = document.createElement('div');
    date.textContent = months[crntDate.getMonth()] + " " + crntDate.getDate() + " " + crntDate.getFullYear();
    date.style.fontSize = '2vw';
    body.insertBefore(date, body.firstChild);

    var day = document.createElement('div');
    day.textContent = daysOfWeek[crntDate.getDay()];
    day.style.fontSize = '6vw';
    body.insertBefore(day, body.firstChild);
}

async function getTimeTable(schoolAddress, token) {
    const url = `${schoolAddress}/api/3/timetable/permanent?hx=${token}`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.ok)
        return await response.json();
}

async function getToken(username, password, schoolAddress) {
    const url = schoolAddress + '/api/login';

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
