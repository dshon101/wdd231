// course.mjs
// Contains the byuiCourse object and its enrollment methods.

const byuiCourse = {
  name: "Web Frontend Development I",
  code: "WDD 231",
  sections: [
    {
      sectionNum: 1,
      enrolled: 12,
      instructor: "Brother Smith",
    },
    {
      sectionNum: 2,
      enrolled: 18,
      instructor: "Sister Jones",
    },
    {
      sectionNum: 3,
      enrolled: 9,
      instructor: "Brother Davis",
    },
    {
      sectionNum: 4,
      enrolled: 22,
      instructor: "Sister Wilson",
    },
  ],

  // Enrolls or drops a student from the given section number.
  // Pass false as the second argument to drop instead of enroll.
  changeEnrollment(sectionNum, enroll = true) {
    const section = this.sections.find((s) => s.sectionNum === sectionNum);
    if (section) {
      if (enroll) {
        section.enrolled++;
      } else {
        if (section.enrolled > 0) {
          section.enrolled--;
        }
      }
    }
    // NOTE: renderSections() is NOT called here.
    // It is called in modules.mjs after changeEnrollment() returns,
    // keeping rendering concerns separate from data concerns.
  },
};

export default byuiCourse;
