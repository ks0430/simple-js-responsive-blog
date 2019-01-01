$(document).ready(function() {
  console.log("Document ready!");

  window.location.replace("./#home");
  $(window).scroll(() => {
    // Header: change stick header background
    // if use arrow function, then this will bind to window object.
    stickHeaderHandler();
  });

  // Input focus label change handler
  inputFocusHandler();
  navbarLinkHandler();
});

// header stick handler - bind to document object
stickHeaderHandler = () => {
  if (window.pageYOffset >= 20) {
    $("#header").addClass("b-header--white");
  } else {
    $("#header").removeClass("b-header--white");
  }
};

inputFocusHandler = () => {
  let input = $(".b-form__input, .b-form__textarea"); // input & textarea array

  input.focusin(function() {
    $(this)
      .siblings(".b-form__label")
      .addClass("b-form__label--focus");
    $(this)
      .siblings(".b-form__icon")
      .addClass("");
  });

  input.focusout(function() {
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

navbarLinkHandler = () => {
  let link = $(".b-navbar__link");
  console.log(link);
  link.click(function() {
    // active current link: white underline
    link.removeClass("b-navbar__link--active");
    $(this).addClass("b-navbar__link--active");
    // when in mobile mode, close current navbar, change checked

    // Close mobile menu, set checkbox to false.
    $("#navbar-mobile")[0].checked = false;
  });
};
