
/*---------------------Global Settings--------------------*/
const Global = {
  isHomePage: false,
  // On github page, host on sub page
  isHostOnSubPage: true
}

/*---------------------Section & Navbar Control--------------------*/
class Section {
  constructor(name,hash,node,onSectionChange){
    this.hash = hash;
    this.name = name;
    this.section = node;
    this.onSectionChange = onSectionChange;
    this.isInAnimation = false;
    this.isShow = false;

    this.isShowing = false;

    // diplay:none is effect on child elemnts
    this.contentBox = node.children[0];
    // Register eventListener
    this.eventListener = this.eventListener.bind(this);
    this.eventListener();
  }

  eventListener(){
    this.contentBox.addEventListener("animationend",(event) =>{

      // console.log("animated:",event.target);
      // animation finished
      this.isInAnimation=false;

      // Cancel any animation class
      if(this.contentBox.classList.contains("u-anim-out")) {
        this.contentBox.classList.remove("u-anim-out");
        this.contentBox.classList.remove("b-current-content");
        this.isShow = false;
      }

      if(this.contentBox.classList.contains("u-anim-in")) {
        this.contentBox.classList.remove("u-anim-in");
        this.isShowing = false;
        this.isShow = true;
      }
    })
  }

  show() {
    if(this.isInAnimation) {
      console.log("Section",this.name,"is in animation!");
    }
    if(this.isShow) {
      console.log("Section",this.name,"is already show!");
      return;
    }
    this.isInAnimation = true;
    // For showing check. If current section is during showing, then not show another card.
    this.isShowing = true;
    this.contentBox.classList.add("b-current-content");
    this.contentBox.classList.add("u-anim-in");
  }

  hide() {
    if(this.isInAnimation) {
      console.log("hide: Section",this.name,"is in animation!");
      return;
    }
    // if it is hided,  don't do anything
    if(!this.isShow){
      // console.log("Section",this.name,"is already hide!");
      return;
    } 
    this.isInAnimation = true;
    this.contentBox.classList.add("u-anim-out");
  }

  toggle() {
    if(this.isInAnimation) {
      console.log("hide: Section",this.name,"is in animation!");
      return;
    }
    this.isInAnimation = true;
    if(this.isShow) {
      // Hide elements
      this.contentBox.classList.add("u-anim-out");
    } else {
      // Show elements
      this.contentBox.classList.add("b-current-content");
      this.contentBox.classList.add("u-anim-in");
    }
  }

}

class SectionController {
  constructor() {
    this.sectionList = [];
    // hash key & section content
    this.sectionMap = [];
    this.currentHash = "";
    this.onNavbarClick = this.onNavbarClick.bind(this);
    this.initial();
  }

  initial() {
    // Creat sections
    const sectionNodes = document.querySelectorAll("section");
    const sectionArr = Object.values(sectionNodes);
    this.sectionList = sectionArr.map(item => (new Section(item.id,`#${item.id}`,item,null)));
    
    // Access link & section page
    this.sectionList.forEach(item => this.sectionMap[item.hash] = item);
    // Create navbar
    let navbar =  new Navbar(this.onNavbarClick);

    // Initial link & section
    this.currentHash = window.location.hash;
    let currentSection = this.sectionMap[this.currentHash];
    this.toggleSection(currentSection);
    navbar.active(this.currentHash);
    // Click on brand
    this.brandClick(navbar);
  }


  brandClick(navbar) {
    // Brand click
    const brand = document.querySelector(".b-navbar__brand");
    console.log(brand);

    brand.addEventListener("click",() => {
      let hash = "#home";
      let section = this.sectionMap[hash];
      // If current is home page 
      if(this.currentHash === hash) {
        console.log("Current section is already selected!");
        return;
      }
      let isInToggleAnimation = this.toggleSection(section);
      // 
      if(isInToggleAnimation) {
        console.error("In animation");
        event.preventDefault();
        return;
      }
      navbar.toggle("#home");
      this.currentHash = hash;
    })
  }

  onNavbarClick(hash) {
    let section = this.sectionMap[hash];

    console.log("Navbarlink",this.currentHash);
    if(this.currentHash === hash) {
      console.log("Current section is already selected!");
      event.preventDefault();
      return false;
    }
    let isInToggleAnimation = this.toggleSection(section);
    if(isInToggleAnimation) {
      event.preventDefault();
      return false;
    }
    this.currentHash = hash;
    return true;
  }

  toggleSection(currentItem) {
    let isAnySectionShowing = false;
    let currentSection = this.sectionList[this.currentHash];
    if(currentItem === currentSection) {
      console.log("Current section return");
      return;
    }
    this.sectionList.forEach(item => {
      item.hide();
      // If there is one object in Animation, then don't do show();
      isAnySectionShowing = isAnySectionShowing || item.isShowing;
    });
    if(isAnySectionShowing) {
      console.warn("In animation!! return!");
      return true;
    }
    currentItem.show(); 
  }
}

class Navbar {
  constructor(onClick=null) {
    this.linkList = null;
    this.linkMap = [];
    this.onClick = onClick;
    // Bind to Navbar
    this.navbarClick = this.navbarClick.bind(this);
    this.init();
  }

  init(){
    // Create link arr
    let linkNodes = document.querySelectorAll(".b-navbar__link");
    this.linkList = Object.values(linkNodes).map(item => (new NavbarLink(item.hash,item,this.navbarClick)));
    this.linkList.forEach(item => this.linkMap[item.hash] = item);
    console.log("linklist",this.linkList);
    // Toogle link

  }

  navbarClick(link) {
    // Close mobile menu, set checkbox to false.
    $("#navbar-mobile")[0].checked = false;
    // During section animation, set disable.
    let isContinue = this.onClick(link.hash);
    if(isContinue){
      this.toggle(link.hash);
      console.log("continue");
    } 
  }

  active(hash) {
    this.linkMap[hash].active();
  }

  inactive(hash) {
    this.linkMap[hash].inactive();
  }

  toggle(hash) {
    console.log(242);
    let link = this.linkMap[hash];
    this.linkList.forEach(item => {
      item.inactive();
    });
    link.active();
  }
}

class NavbarLink {
  constructor(hash,node,onClick = null) {
    this.hash = hash;
    this.node = node;
    this.onClick = onClick;
    // Private variables
    this.eventListener = this.eventListener.bind(this);
    this.eventListener();
  }

  eventListener() {
    this.node.addEventListener("click",(event)=> {
      this.onClick(this);
    });
  }

  active() {
    this.node.classList.add("b-navbar__link--active");
  }

  inactive() {
    this.node.classList.remove("b-navbar__link--active");
  }
}

/*---------------------Header Sticker--------------------*/
const stickHeaderHandler = () => {
  if (window.pageYOffset >= 20) {
    $("#header").addClass("b-header--white");
  } else {
    $("#header").removeClass("b-header--white");
  }
};

/*---------------------Input Handler--------------------*/
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

/*---------------------SVG Preload--------------------*/
const preloadSVG = () => {
  const ajax = new XMLHttpRequest();
  const path = "img/portfolio/icons/sprite.svg";
  console.log(path);
  ajax.open("GET", path);
  ajax.send();
  ajax.onload = function (event) {
    let div = document.createElement("div");
    div.innerHTML = ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);
    console.log(div);
  };
};

/*---------------------Host Settings (For github & local)--------------------*/
const initialSetting = () => {
  // Attension! For github page setting
  // Because of subpage hosting, svg img path will change depend on repo's name.
  let pathArr = window.location.pathname.split('/');
  console.log(pathArr);
  // If host on subpage, determine which part is hoem page.
  // git hub is the second part
  // localhost is the first part
  let homePagePath = Global.isHostOnSubPage? pathArr[1]:pathArr[0];
  let currentPath = window.location.pathname.replaceAll('/','') ;
  // Check if it is homepage
  Global.isHomepage =  homePagePath === currentPath? true : false;
}

/*---------------------Mail Server--------------------*/
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

/*---------------------Utilities--------------------*/
const utilities = () => {
  // String whole replace
  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
  };
}

/*---------------------Document ready => start!--------------------*/
$(document).ready(function () {
  console.log("Document ready!");

  utilities();
  initialSetting();

  $(window).scroll(() => {
    // Header: change stick header background
    stickHeaderHandler();
  });

  // Input focus label change handler
  inputFocusHandler();

  // Preload svg
  preloadSVG();

  // Two Pages: home & blog page, select from two pages
  if (Global.isHomepage) {
    const hash = window.location.hash;
    if(hash==="") window.location.replace("./#home");
    // open sectionController
    const sectionController = new SectionController();
  }

  // Mail
  // Todo:
  // 1. Cros origin call conflict
  // 2. Google map conflict with form.children reading
  // mailFormHandler();

});