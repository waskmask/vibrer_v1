document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const settingsBtn = document.getElementById("settings");
  const settingsModal = document.getElementById("settings-modal");
  const enableCookiesCheckbox = document.getElementById("enable-cookies");
  const saveSettingsBtn = document.getElementById("save-settings");

  // Check cookie settings
  if (localStorage.getItem("cookiesEnabled") === "true") {
    enableCookies();
  } else {
    banner.style.display = "block";
  }

  // Accept Cookies
  acceptBtn.addEventListener("click", () => {
    enableCookies();
    banner.style.display = "none";
  });

  // Open Settings
  settingsBtn.addEventListener("click", () => {
    settingsModal.style.display = "block";
  });

  // Save Settings
  saveSettingsBtn.addEventListener("click", () => {
    const enable = enableCookiesCheckbox.checked;
    if (enable) {
      enableCookies();
    } else {
      disableCookies();
    }
    settingsModal.style.display = "none";
    banner.style.display = "none";
  });

  function enableCookies() {
    localStorage.setItem("cookiesEnabled", "true");
    // Add your code to enable cookies here
  }

  function disableCookies() {
    localStorage.setItem("cookiesEnabled", "false");
    // Add your code to disable cookies here
  }
});
