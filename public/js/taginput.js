document.addEventListener("DOMContentLoaded", function () {
  var tagWrappers = document.querySelectorAll(".tag_wrapper");

  // Check if tagWrappers exist on the page
  if (tagWrappers.length === 0) {
    return; // Exit if no tag_wrappers are found
  }

  tagWrappers.forEach(function (wrapper) {
    var addTagsInput = wrapper.querySelector(".add_tags");

    addTagsInput.addEventListener("keyup", function (event) {
      if (event.key === "Enter" || event.key === ",") {
        event.preventDefault(); // Prevent form submission
        createTagsFromInput(this, wrapper);
      }
    });

    addTagsInput.addEventListener("input", function (event) {
      if (this.value.includes(",")) {
        createTagsFromInput(this, wrapper);
      }
    });
  });

  function createTagsFromInput(inputElement, wrapper) {
    var tags = inputElement.value
      .split(",")
      .map(function (tag) {
        // Remove special characters and trim spaces
        return tag.replace(/[^a-zA-Z0-9]/g, "").trim();
      })
      .filter(function (tag) {
        // Filter out empty tags
        return tag !== "";
      });

    tags.forEach(function (tag) {
      if (!wrapper.querySelector(".tags_input")) {
        createTagElements(wrapper);
      }
      var tagList = wrapper.querySelector(".tag_list");
      var hiddenInput = wrapper.querySelector(".tags_input");
      if (!isTagDuplicate(tag, tagList)) {
        addTag(tag, tagList, hiddenInput);
      }
    });

    inputElement.value = ""; // Clear the input field
  }

  function isTagDuplicate(tagText, tagList) {
    var existingTags = tagList.querySelectorAll(".tags");
    return Array.from(existingTags).some(function (existingTag) {
      return existingTag.textContent === tagText;
    });
  }

  // functions (createTagElements, addTag, updateHiddenInput)
  function createTagElements(wrapper) {
    var hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "tags";
    hiddenInput.className = "tags_input";
    wrapper.appendChild(hiddenInput);

    var tagList = document.createElement("div");
    tagList.className = "tag_list";
    wrapper.appendChild(tagList);
  }

  function addTag(text, tagList, hiddenInput) {
    var newTag = document.createElement("div");
    newTag.classList.add("tags");
    newTag.textContent = text;
    newTag.addEventListener("click", function () {
      this.remove();
      if (tagList.querySelectorAll(".tags").length === 0) {
        // Remove hidden input and tag list if no tags left
        tagList.remove();
        hiddenInput.remove();
      } else {
        updateHiddenInput(tagList, hiddenInput);
      }
    });
    tagList.appendChild(newTag);
    updateHiddenInput(tagList, hiddenInput);
  }

  function updateHiddenInput(tagList, hiddenInput) {
    var tags = Array.from(tagList.querySelectorAll(".tags")).map(function (
      tag
    ) {
      return tag.textContent;
    });
    hiddenInput.value = tags.join(",");
  }
});
