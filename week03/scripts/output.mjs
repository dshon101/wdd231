// output.mjs
// Renders the course title and sections table to the page.

export function setTitle(course) {
  document.querySelector("#courseName").textContent = course.name;
  document.querySelector("#courseCode").textContent = course.code;
}

export function renderSections(sections) {
  const tbody = document.querySelector("#sectionList");
  tbody.innerHTML = ""; // Clear previous rows

  sections.forEach((section) => {
    const row = document.createElement("tr");

    const tdSection = document.createElement("td");
    tdSection.textContent = section.sectionNum;

    const tdEnrolled = document.createElement("td");
    tdEnrolled.textContent = section.enrolled;

    const tdInstructor = document.createElement("td");
    tdInstructor.textContent = section.instructor;

    row.appendChild(tdSection);
    row.appendChild(tdEnrolled);
    row.appendChild(tdInstructor);
    tbody.appendChild(row);
  });
}
