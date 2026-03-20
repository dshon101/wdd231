// sections.mjs
// Handles populating the section selection dropdown.

export function setSectionSelection(sections) {
  const select = document.querySelector("#sectionNumber");

  // Clear existing options (except the placeholder)
  select.innerHTML = '<option value="">--</option>';

  sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNum;
    option.textContent = `Section ${section.sectionNum}`;
    select.appendChild(option);
  });
}
