function shareOnWhatsapp(postUrl) {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(postUrl)}`;
  window.open(whatsappUrl, "_blank");
}

function shareOnFacebook(postUrl) {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    postUrl
  )}`;
  window.open(facebookUrl, "_blank");
}

function shareOnTwitter(postUrl) {
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    postUrl
  )}`;
  window.open(twitterUrl, "_blank");
}
const copiedUrl = document.querySelector(".urlCopied");
const urlHolder = document.querySelector(".urlHolder");
function copyUrl(postUrl) {
  navigator.clipboard.writeText(postUrl).then(
    () => {
      if (copiedUrl && urlHolder) {
        copiedUrl.classList.add("show");
        urlHolder.classList.add("focus");
        setTimeout(() => {
          urlHolder.classList.remove("focus");
          copiedUrl.classList.remove("show");
        }, 2000);
      } else {
        // Optionally handle the case where .urlCopied does not exist
        console.log("Copy confirmation element not found.");
      }
    },
    (err) => {
      console.error("Could not copy text: ", err);
    }
  );
}
