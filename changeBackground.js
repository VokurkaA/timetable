function changeBackground(specification){
    console.log(window.getComputedStyle(document.body).backgroundImage);
    document.body.style.background = specification;

}