let isPageLoaded = false;
let isTimerDone = false;

const loader = document.getElementById("loader");
if (loader) {
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
  }, 1000); // 1 second

  // Hide the loader when the page is fully loaded
  window.addEventListener("load", function () {
    isPageLoaded = true;
    hideLoader();
  });
}

const usernameElement = document.getElementById("username");
if (usernameElement) {
  usernameElement.addEventListener("click", function () {
    const text = this.innerText.replace("@", "");
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const alertDiv = document.createElement("div");
        alertDiv.setAttribute("class", "copyUname");
        alertDiv.innerText = "Copied!";
        this.appendChild(alertDiv);
        setTimeout(() => {
          alertDiv.remove();
        }, 700);
      })
      .catch((error) => {
        console.error("Copy failed", error);
      });
  });
}

const hpHeadElement = document.querySelector(".hphead");
if (hpHeadElement) {
  hpHeadElement.addEventListener("click", function (event) {
    let dropDown = document.querySelector(".hpdd");
    if (dropDown) {
      dropDown.classList.toggle("show");
      event.stopPropagation();
    }
  });
}

document.addEventListener("click", function (event) {
  let dropDown = document.querySelector(".hpdd");
  if (dropDown && !dropDown.contains(event.target)) {
    dropDown.classList.remove("show");
  }
});

// Function to toggle sidebar
function toggleSidebar() {
  let appSidebar = document.querySelector(".app_sidebar");
  let appSbOverlay = document.querySelector(".app_sb_overlay");
  if (appSidebar && appSbOverlay) {
    appSidebar.classList.toggle("show");
    appSbOverlay.style.display = appSidebar.classList.contains("show")
      ? "block"
      : "none";
  }
}

const burgerMenuElement = document.querySelector(".burger_menu");
if (burgerMenuElement) {
  burgerMenuElement.addEventListener("click", toggleSidebar);
}

const appSbOverlay = document.querySelector(".app_sb_overlay");
if (appSbOverlay) {
  appSbOverlay.addEventListener("click", toggleSidebar);
}

const closeSidebarElement = document.querySelector(".close_sidebar");
if (closeSidebarElement) {
  closeSidebarElement.addEventListener("click", toggleSidebar);
}
