document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("applForm");
  const btn = document.querySelector(".ml-btn");
  const successPop = document.querySelector(".success-message");
  // Disable HTML5 validation
  form.setAttribute("novalidate", "");

  // Retrieve Project ID dynamically
  const urlParts = window.location.pathname.split("/");
  const projectId = urlParts[urlParts.length - 1];

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Change button text to "Sending..."
    btn.textContent = "Sending...";

    // Implement the timeout function
    setTimeout(async () => {
      let isValid = true;
      let customErrors = {};

      const formData = new FormData(form);
      const formDataJSON = Object.fromEntries(formData.entries());

      // Validation
      for (const key in formDataJSON) {
        formDataJSON[key] = formDataJSON[key].trim();
      }

      const { firstName, lastName, email, phone, city, country, link } =
        formDataJSON;

      if (!firstName || firstName.length < 2) {
        isValid = false;
        customErrors.firstName = "First name must be at least 2 characters.";
      }

      if (!lastName || lastName.length < 2) {
        isValid = false;
        customErrors.lastName = "Last name must be at least 2 characters.";
      }

      if (
        !email ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
      ) {
        isValid = false;
        customErrors.email = !email
          ? "Email is required"
          : "Please enter a valid email";
      }

      // New phone validation
      if (!phone || !/^\+?[0-9]\d{1,14}$/.test(phone)) {
        isValid = false;
        customErrors.phone = !phone
          ? "Phone is required"
          : "Please enter a valid phone number";
      }

      if (!city) {
        isValid = false;
        customErrors.city = "City is required.";
      }

      if (!country) {
        isValid = false;
        customErrors.country = "Country is required.";
      }

      if (!link) {
        isValid = false;
        customErrors.link = "Youtube, Instagram or Website link is required.";
      }

      // Clear previous error alerts
      const prevAlerts = document.querySelectorAll(".form-alert");
      prevAlerts.forEach((alert) => alert.remove());

      if (isValid) {
        const url = `/addApplicant/${projectId}`;
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataJSON),
          });

          if (response.status === 200) {
            successPop.style.display = "block";
            // Hide it after 3 seconds
            setTimeout(() => {
              successPop.style.display = "none";
            }, 5000);
            form.reset();
          } else {
            console.log(response);
          }
        } catch (err) {
          console.error("An error occurred", err);
        }
      } else {
        for (const key in customErrors) {
          const inputElement = form.querySelector(`[name="${key}"]`);
          const alertDiv = document.createElement("div");
          alertDiv.className = "form-alert error";
          alertDiv.textContent = customErrors[key];
          inputElement.parentNode.insertBefore(
            alertDiv,
            inputElement.nextSibling
          );
        }
      }

      // Reset the button text
      btn.textContent = "Send";
    }, 1000); // 1-second delay
  });
});
