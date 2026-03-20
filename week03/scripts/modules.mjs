// modules.mjs
// Main entry point. Imports from modules and wires up event listeners.

import byuiCourse from './course.mjs';
import { setSectionSelection } from './sections.mjs';
import { setTitle, renderSections } from './output.mjs';

// Initial page render
setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);

// Enroll a student in the selected section
document.querySelector("#enrollStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);
  byuiCourse.changeEnrollment(sectionNum);
  renderSections(byuiCourse.sections);
});

// Drop a student from the selected section
document.querySelector("#dropStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);
  byuiCourse.changeEnrollment(sectionNum, false);
  renderSections(byuiCourse.sections);
});
