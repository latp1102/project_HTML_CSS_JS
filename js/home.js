const searchInput = document.getElementById("search");
const courses = document.querySelectorAll(".course");

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.trim().toLowerCase();

  courses.forEach((course) => {
    const subject = course.subject.trim().toLowerCase();
    if (subject.includes(searchTerm)) {
      course.style.display = "block";
    } else {
      course.style.display = "none";
    }
  });
});
