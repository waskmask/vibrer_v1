document.addEventListener("DOMContentLoaded", () => {
  const Uppy = window.Uppy;
  const { Dashboard, AwsS3Multipart } = Uppy;
  const uppy = new Uppy.Core({
    debug: true, // Enable for debugging purposes
    restrictions: {
      maxFileSize: 1000000000, // Adjust file size limit as needed
    },
  });

  uppy.use(Dashboard, {
    inline: true,
    target: "#uppy",
    note: "Images and video only, 1 GB max",
    maxHeight: 450,
    metaFields: [
      // Example metadata fields
      { id: "name", name: "Name", placeholder: "file name" },
    ],
  });

  uppy.use(AwsS3Multipart, {
    limit: 2, // Adjust parallel uploads as needed
    companionUrl: "https://your-companion-server.com/", // Point to your Companion server or API endpoint
  });

  uppy.on("complete", (result) => {
    console.log("Upload complete: ", result);
  });
});
