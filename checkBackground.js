var cookies = document.cookie;
cookies = cookies.split("; ");
if (cookies.length == 4){
    var bg = cookies[3].split("=");
    document.body.style.background = bg[1];
}