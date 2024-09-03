// languageSwitcher.js v 1.2
document.addEventListener("DOMContentLoaded", function () {
  var languageSwitcher = document.querySelector(".app-languageSwitcher");

  // Function to set a cookie
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Function to get a cookie by name
  function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) === " ")
        cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(nameEQ) === 0)
        return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
  }

  // Function to change language and save the preference in a cookie
  function changeLanguage(lang) {
    setCookie("i18n", lang, 30); // Set the language preference in a cookie for 30 days
    window.location.reload(); // Reload the page
  }

  var items = document.querySelectorAll(".app-languageSwitcher .item");

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      var lang = this.getAttribute("data-value");
      changeLanguage(lang);
    });
  });

  // Highlight the currently selected language and update the toggle image
  const currentLang = getCookie("i18n") || "en";
  document
    .querySelectorAll(".app-languageSwitcher .item")
    .forEach(function (item) {
      if (item.getAttribute("data-value") === currentLang) {
        item.classList.add("active"); // Add 'active' class to highlight the current language
      } else {
        item.classList.remove("active");
      }
    });
});
