let isPageLoaded = false;
let isTimerDone = false;

const loader = document.getElementById("loader");

// Function to hide the loader
function hideLoader() {
  if (isPageLoaded && isTimerDone) {
    loader.style.display = "none";
  }
}

// Hide the loader after 1 second
setTimeout(function () {
  isTimerDone = true;
  hideLoader();
}, 100); // 1 second

// Hide the loader when the page is fully loaded
window.addEventListener("load", function () {
  isPageLoaded = true;
  hideLoader();
});

function scrollToGNForm() {
  if (window.location.pathname !== "/" || window.location.hash !== "#gnform") {
    window.location.href = "/#gnform";
  } else {
    const element = document.getElementById("gnForm");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}
function toRegister() {
  window.location.href = "/register";
}

function toLogin() {
  window.location.href = "/login";
}

function toPrivacy() {
  window.location.href = "/privacy";
}

function toTerms() {
  window.location.href = "/terms";
}
function toCookies() {
  window.location.href = "/cookies";
}
function toImprint() {
  window.location.href = "/imprint";
}
function toHome() {
  window.location.href = "/";
}

document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const menuOverlay = document.querySelector(".menu-overlay");
  const closeMenu = document.querySelector(".menu-close");

  // Function to show the menu
  function showMenu() {
    menu.classList.add("active");
    menuOverlay.style.display = "block";
  }

  // Function to hide the menu
  function hideMenu() {
    menu.classList.remove("active");
    menuOverlay.style.display = "none";
  }

  // Event listeners
  burger.addEventListener("click", showMenu);
  closeMenu.addEventListener("click", hideMenu);
  menuOverlay.addEventListener("click", hideMenu);

  const toTopButton = document.querySelector(".toTop");

  function toggleToTopButton() {
    if (window.scrollY >= 700) {
      toTopButton.classList.add("active");
    } else {
      toTopButton.classList.remove("active");
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  toggleToTopButton(); // Check initial scroll position

  window.addEventListener("scroll", toggleToTopButton);
  toTopButton.addEventListener("click", scrollToTop);
});
