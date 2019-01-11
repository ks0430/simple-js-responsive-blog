"use strict";

const preloadSVG = () => {
  const ajax = new XMLHttpRequest();
  ajax.open("GET", "img/portfolio/icons/sprite.svg");
  ajax.send();
  ajax.onload = function(event) {
    let div = document.createElement("div");
    div.innerHTML = ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);
    console.log(div);
  };
};

export default preloadSVG;
