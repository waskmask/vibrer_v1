// Function to create and append the cookie banner HTML

function createCookieBanner() {
  // Create the HTML elements
  const banner = document.createElement("div");
  banner.id = "cookie-banner";
  banner.className = "cookie-banner";

  const text = document.createElement("p");
  text.innerHTML =
    "We use cookies and other technologies to improve and personalize your user experience, We use our own cookies and third-party cookies. If you click Accept, you accept the use of all cookies. We always set necessary cookies. Select Manage settings to decide which cookies you want to accept.";

  const buttonDiv = document.createElement("div");

  const acceptButton = document.createElement("button");
  acceptButton.className = "btn btn-sm btn-primary";
  acceptButton.id = "accept-cookies";
  acceptButton.innerText = "Accept";

  const settingsButton = document.createElement("button");
  settingsButton.className = "btn btn-sm";
  settingsButton.id = "settings";
  settingsButton.innerText = "Manage settings";

  buttonDiv.appendChild(acceptButton);
  buttonDiv.appendChild(settingsButton);

  banner.appendChild(text);
  banner.appendChild(buttonDiv);

  // Append the banner to the body
  document.body.appendChild(banner);
}

// Function to remove the cookie banner HTML
function removeCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  if (banner) {
    banner.remove();
  }
}

// Main function to handle the cookie banner logic
function handleCookieBanner() {
  const cookieAcceptance = localStorage.getItem("cookies-accepted");
  if (cookieAcceptance === "true") {
    removeCookieBanner();
  } else {
    createCookieBanner();

    const acceptButton = document.getElementById("accept-cookies");
    const settingsButton = document.getElementById("settings");

    acceptButton.addEventListener("click", () => {
      localStorage.setItem("cookies-accepted", "true");
      localStorage.setItem("analytics", "true");
      localStorage.setItem("marketing", "true");
      localStorage.setItem("preference", "true");
      localStorage.setItem("socialMedia", "true");

      removeCookieBanner();
    });

    settingsButton.addEventListener("click", () => {
      window.location.href = "/cookies";
    });
  }
}

// Initialize cookie banner logic when DOM is loaded
document.addEventListener("DOMContentLoaded", handleCookieBanner);
