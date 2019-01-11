"use strict";

const preloadSVG = () => {
  const ajax = new XMLHttpRequest();
  const pathName = window.location.pathname;
  const svgPath = pathName + "img/portfolio/icons/sprite.svg";
  console.log(svgPath);
  ajax.open("GET", svgPath);
  ajax.send();
  ajax.onload = function(event) {
    let div = document.createElement("div");
    div.innerHTML = ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);
    console.log(div);
  };
};

export default preloadSVG;
