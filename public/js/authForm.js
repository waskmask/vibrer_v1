document.addEventListener("DOMContentLoaded", function () {
  // Function to toggle password visibility
  function togglePassword(inputField, icon) {
    if (inputField.type === "password") {
      inputField.type = "text";
      icon.style.opacity = 0.5;
      setTimeout(() => {
        inputField.type = "password";
        icon.style.opacity = 1;
      }, 2000); // Change back after 2 seconds
    }
  }

  // Attach click event to all .passInput elements
  var passwordToggles = document.querySelectorAll(".passInput");

  passwordToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      var inputField = this.parentElement.querySelector(
        "input[type='password'], input[type='text']"
      );
      var icon = this.querySelector("img");
      if (inputField) {
        togglePassword(inputField, icon);
      }
    });
  });
});
