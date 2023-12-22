function changeBackground(specification){
    document.body.style.background = specification;
    setCookie("background", specification);
}

function setCookie(name, value) {
    var date = new Date();
    date.setFullYear(date.getFullYear() + 4);
    expires = "; expires=" + date.toUTCString();

    document.cookie = name + "=" + value + expires + "; path=/";
}   