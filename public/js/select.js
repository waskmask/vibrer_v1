//   select
function initializeCustomSelect(customSelect) {
  const placeholder = customSelect.querySelector(".placeholder");
  const options = customSelect.querySelector(".options");
  const optionItems = customSelect.querySelectorAll(".option");
  const hiddenInput = customSelect.querySelector("input[name]");

  let selectedOption = null;

  // function toggleOptions() {
  //   options.classList.toggle("active");
  // }

  function toggleOptions() {
    options.classList.toggle("active");

    if (options.classList.contains("active")) {
      const optionsRect = options.getBoundingClientRect();
      const customSelectRect = customSelect.getBoundingClientRect();

      if (optionsRect.bottom > window.innerHeight) {
        // If options go below the screen, position them above the custom select
        const availableSpaceAbove = customSelectRect.top;
        const bufferSpace = 6; // Adjust this value to control the spacing
        const topPosition = -optionsRect.height - bufferSpace;
        options.style.top = `${topPosition}px`;
      } else if (optionsRect.top < 0) {
        // If options go above the screen, position them below the custom select
        const availableSpaceBelow =
          window.innerHeight - customSelectRect.bottom;
        const bufferSpace = 6; // Adjust this value to control the spacing
        const topPosition = customSelectRect.height + bufferSpace;
        options.style.top = `${topPosition}px`;
      } else {
        // Reset the position if options are within the screen boundaries
        options.style.top = null;
      }
    }
  }

  function selectOption(event) {
    const clickedOption = event.target;
    const value = clickedOption.getAttribute("value");
    const label = clickedOption.textContent;

    if (selectedOption) {
      selectedOption.classList.remove("selected");
    }

    clickedOption.classList.add("selected");
    selectedOption = clickedOption;

    placeholder.textContent = label;
    hiddenInput.value = value;
    placeholder.classList.add("selected");
    options.classList.remove("active");
  }

  function closeOptions(event) {
    if (!customSelect.contains(event.target)) {
      options.classList.remove("active");
    }
  }

  customSelect.addEventListener("click", toggleOptions);

  optionItems.forEach((option) => {
    option.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent click event from reaching the custom-select container
      selectOption(event);
    });
  });

  document.addEventListener("click", closeOptions);
}

// Get all custom select elements and initialize each one
const customSelects = document.querySelectorAll(".custom-select");
customSelects.forEach((select) => {
  initializeCustomSelect(select);
});
