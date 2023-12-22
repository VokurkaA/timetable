function changeBackground(specification){
    console.log(window.getComputedStyle(document.body).backgroundImage);
    document.body.style.background = specification;
    setCookie("background", specification);
    console.log("cookie changed, set to " + specification);
}

function setCookie(name, value) {
    var date = new Date();
    date.setFullYear(date.getFullYear() + 4);
    expires = "; expires=" + date.toUTCString();

    document.cookie = name + "=" + value + expires + "; path=/";
}   