document.getElementById("CloudSave").addEventListener("click", function() {
  const localStorageItems = { ...localStorage };
  const jsonContent = JSON.stringify(localStorageItems);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const formData = new FormData();
  formData.append("file", blob, "localStorage.json");

  fetch("https://api.github.com/repos/YuushaExa/v/contents/users/localStorage.json", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + process.env.GITHUB_TOKEN
    },
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log("File uploaded successfully!");
      console.log("URL:", data.content.html_url);

      // Update LastSaved key in localStorage
      localStorage.setItem("LastSaved", new Date().toISOString());
    })
    .catch(error => {
      console.error("Error uploading the file:", error);

      // Update LastSaved key in localStorage with error message
      localStorage.setItem("LastSaved", "Error: " + error.message);
    });
});
