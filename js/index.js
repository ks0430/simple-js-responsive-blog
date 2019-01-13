// Attension! For github page setting
// Because of subpage hosting, svg img path will change depend on repo's name.
let isHostOnSubPage = true;
let pathArr = window.location.pathname.split('/');
let svgPath = pathArr[0];
console.log(svgPath);




let Page = {
  currentPage: null,
  moveOut: false,
  moveIn: false
};

let eventTrash = 0;

$(document).ready(function () {
  console.log("Document ready!");


  redrirectHomeHandler();

  $(window).scroll(() => {
    // Header: change stick header background
    // if use arrow function, then this will bind to window object.
    stickHeaderHandler();
  });

  // Input focus label change handler
  inputFocusHandler();
  navbarLinkHandler();

  // Page select animation
  selectionChange();


  // Preload svg
  preloadSVG(svgPath);

  // For home page
  const path = window.location.pathname;
  console.log("window", path);
  if (path === "/") {
    window.location.replace("./#home");
    // Initial stats
    initial();
  }


  // Mail
  // Todo:
  // 1. Cros origin call conflict
  // 2. Google map conflict with form.children reading
  // mailFormHandler();
});

const redrirectHomeHandler = () => {
  const path = window.location;
  console.log(window.location);
}

// header stick handler - bind to document object
const stickHeaderHandler = () => {
  if (window.pageYOffset >= 20) {
    $("#header").addClass("b-header--white");
  } else {
    $("#header").removeClass("b-header--white");
  }
};

const inputFocusHandler = () => {
  let input = $(".b-form__input, .b-form__textarea"); // input & textarea array

  input.focusin(function () {
    $(this)
      .siblings(".b-form__label")
      .addClass("b-form__label--focus");
    $(this)
      .siblings(".b-form__icon")
      .addClass("");
  });

  input.focusout(function () {
    $(this)
      .siblings(".b-form__label")
      .removeClass("b-form__label--focus");

    if ($(this).val() !== "") {
      $(this)
        .siblings(".b-form__label")
        .addClass("b-form__label--focus");
    }
  });
};

const navbarLinkHandler = () => {
  let link = $(".b-navbar__link");
  console.log(link);
  link.click(function () {
    if (Page.moveIn || Page.moveOut) return;

    // active current link: white underline
    link.removeClass("b-navbar__link--active");
    $(this).addClass("b-navbar__link--active");
    // when in mobile mode, close current navbar, change checked

    // Close mobile menu, set checkbox to false.
    $("#navbar-mobile")[0].checked = false;
  });
};

const selectionChange = () => {
  let navbarArr = $(".b-navbar__link");
  navbarArr.click(function (event) {
    // console.log("click", Page);
    if (Page.moveIn || Page.moveOut) {
      console.error("Animation not finished");
      return;
    }

    setTimeout(() => {
      const preSection = Page.currentPage;
      const curSection = document.querySelector("section:target > .b-content");

      // If select same page
      if (preSection === curSection) {
        console.log("Already selected");
        return;
      }

      pageMoveIn(curSection);
      pageMoveOut(preSection);
    });
  });
};

const initial = () => {
  let currentSection = document.querySelector("section:target > .b-content");

  // For other page, some section is null.
  console.log(currentSection);
  if (!currentSection) return;


  currentSection.classList.add("b-current-content");
  Page.currentPage = currentSection;

  let pages = document.querySelectorAll("section > .b-content");
  // console.log(pages);
  pages.forEach(item => {
    // console.log(item);
    item.addEventListener("animationend", function () {
      if (item.classList.contains("u-anim-out")) {
        // console.log("preSection finished", item);
        item.classList.remove("u-anim-out");
        item.classList.remove("b-current-content");
        // remove this preSection
        Page.moveOut = false;
      }

      if (item.classList.contains("u-anim-in")) {
        item.classList.remove("u-anim-in");
        Page.moveIn = false;
        // console.log("Move In Finish", item.parentNode);
      }
    });
  });
};

const pageMoveOut = page => {
  page.classList.add("u-anim-out");
  // Animation Start
  Page.moveOut = true;
  // console.log("move out", eventTrash);
};

const pageMoveIn = page => {
  page.classList.add("b-current-content");
  // Add animation class, animation start
  page.classList.add("u-anim-in");
  // Push current section to trash
  Page.moveIn = true;
  // console.log("Move in", Page);
  Page.currentPage = page;
};

const preloadSVG = (_svgPath) => {
  const ajax = new XMLHttpRequest();
  const svgPath = _svgPath + "/img/portfolio/icons/sprite.svg";
  console.log(svgPath);
  ajax.open("GET", svgPath);
  ajax.send();
  ajax.onload = function (event) {
    let div = document.createElement("div");
    div.innerHTML = ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);
    console.log(div);
  };
};

const mailFormHandler = () => {
  let form = document.getElementById("form");
  // Transfer to arr, otherwise can not use find
  let children = Object.values(form.children);
  let button = children.find(item => item.tagName === "BUTTON");
  button.addEventListener("click", function (event) {
    // Do not submit
    event.preventDefault();
    // Use ajax
    // mailPostHandler();
  });
}

const mailPostHandler = () => {
  const ajax = new XMLHttpRequest();
  const apiPath = "https://api.sendgrid.com/v3/mail/send";

  const body =
  {
    "personalizations": [{
      "to": [{ "email": "ore.c0430@gmail.com", "name": "John Doe" }],
      "subject": "Hello, World!"
    }],
    "content": [{ "type": "text/plain", "value": "Test from js" }],
    "from": { "email": "ks0430@163.com", "name": "Evelyn" },
  }
  ajax.open("POST", apiPath);
  ajax.setRequestHeader("authorization", "Bearer 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");
  ajax.setRequestHeader("Content-Type", "application/json");
  // ajax.setRequestHeader("Access-Control-Allow-Origin", apiPath);
  ajax.send(body);
}