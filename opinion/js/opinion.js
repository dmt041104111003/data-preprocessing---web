document.addEventListener("DOMContentLoaded", function() {
    const opinionForm = document.getElementById("opinionForm");

    opinionForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const opinionMessage = document.getElementById("comment").value.trim();
        if (opinionMessage !== "") {
            localStorage.setItem("opinionMessage", opinionMessage);
            location.href = "../opinion/index.html";
        } else {
            alert("Please enter a message before sending.");
        }
    });
});