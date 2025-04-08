const searchInput = document.getElementById("search");
const courses = document.querySelectorAll(".course");

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase().trim();

  courses.forEach((course) => {
    const h2Element = course.querySelector("h2");
    let subjectText = "";
    if (h2Element) {
      subjectText = h2Element.textContent.toLowerCase().trim();
    }

    if (subjectText.includes(searchTerm)) {
      course.style.display = "block";
    } else {
      course.style.display = "none";
    }
  });
});