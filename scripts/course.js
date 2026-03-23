// course.js — Course list display, filtering, and credit totals
// WDD 231 | Demetrious Shoniwa

const courses = [
  {
    subject: 'CSE', number: 110, title: 'Introduction to Programming',
    credits: 2, completed: true,
    certificate: 'Web and Computer Programming',
    description: 'A foundational course covering core programming concepts including variables, control flow, loops, and basic input/output. Students write their first programs using Python.',
    technology: ['Python', 'VS Code', 'Command Line'],
  },
  {
    subject: 'WDD', number: 130, title: 'Web Fundamentals',
    credits: 2, completed: true,
    certificate: 'Web and Computer Programming',
    description: 'Introduces the foundational technologies of the web — HTML structure, CSS styling, and basic layout. Students build and publish their first static websites.',
    technology: ['HTML', 'CSS', 'GitHub Pages'],
  },
  {
    subject: 'CSE', number: 111, title: 'Programming with Functions',
    credits: 2, completed: true,
    certificate: 'Web and Computer Programming',
    description: 'Deepens Python skills with a focus on writing reusable functions, parameter handling, scope, and unit testing. Encourages modular and clean code design.',
    technology: ['Python', 'pytest', 'VS Code'],
  },
  {
    subject: 'CSE', number: 210, title: 'Programming with Classes',
    credits: 2, completed: true,
    certificate: 'Web and Computer Programming',
    description: 'Covers object-oriented programming principles including encapsulation, inheritance, and polymorphism. Students design and implement class-based solutions in Python.',
    technology: ['Python', 'OOP', 'VS Code'],
  },
  {
    subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals',
    credits: 2, completed: true,
    certificate: 'Web and Computer Programming',
    description: 'Builds on WDD 130 by introducing JavaScript for DOM manipulation, events, and dynamic content. Students create interactive, data-driven web pages.',
    technology: ['HTML', 'CSS', 'JavaScript', 'DOM API'],
  },
  {
    subject: 'WDD', number: 231, title: 'Frontend Web Development I',
    credits: 2, completed: false,
    certificate: 'Web and Computer Programming',
    description: 'Focuses on modern frontend practices including responsive design, accessibility, JavaScript modules, Web APIs, and JSON data. Students build multi-page portfolio projects.',
    technology: ['HTML', 'CSS', 'JavaScript', 'JSON', 'Web APIs', 'GitHub'],
  },
  {
    subject: 'CSE', number: 212, title: 'Programming with Data Structures',
    credits: 2, completed: false,
    certificate: 'Web and Computer Programming',
    description: 'Explores fundamental data structures such as stacks, queues, linked lists, trees, and hash maps. Emphasizes problem-solving and algorithm efficiency.',
    technology: ['C#', 'Python', 'Algorithm Analysis', 'VS Code'],
  },
];

const container = document.getElementById('course-container');
const creditCount = document.getElementById('creditCount');
const filterButtons = document.querySelectorAll('.filter-btn');
const courseDetails = document.getElementById('course-details');

// ── Modal display ──────────────────────────────────────────────────
function displayCourseDetails(course) {
  courseDetails.innerHTML = `
    <button id="closeModal" aria-label="Close dialog">&#10005;</button>
    <div class="modal-status ${course.completed ? 'modal-done' : 'modal-progress'}">
      ${course.completed ? '&#10003; Completed' : '&#9679; In Progress'}
    </div>
    <h2 class="modal-code">${course.subject} ${course.number}</h2>
    <h3 class="modal-title">${course.title}</h3>
    <p><strong>Credits:</strong> ${course.credits}</p>
    <p><strong>Certificate:</strong> ${course.certificate}</p>
    <p class="modal-desc">${course.description}</p>
    <p class="modal-tech-label"><strong>Technologies:</strong></p>
    <ul class="modal-tech-list">
      ${course.technology.map(t => `<li>${t}</li>`).join('')}
    </ul>
  `;
  courseDetails.showModal();

  document.getElementById('closeModal').addEventListener('click', () => {
    courseDetails.close();
  });
}

// Close when clicking the ::backdrop (outside dialog box)
courseDetails.addEventListener('click', (e) => {
  const rect = courseDetails.getBoundingClientRect();
  const clickedOutside =
    e.clientX < rect.left || e.clientX > rect.right ||
    e.clientY < rect.top || e.clientY > rect.bottom;
  if (clickedOutside) courseDetails.close();
});

function renderCourses(filter) {
  const filtered = filter === 'all'
    ? courses
    : courses.filter(c => c.subject === filter);

  // Total credits via reduce
  const total = filtered.reduce((sum, c) => sum + c.credits, 0);
  if (creditCount) creditCount.textContent = total;

  if (!container) return;
  container.innerHTML = '';

  filtered.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');
    if (course.completed) card.classList.add('completed');

    card.innerHTML = `
      <div class="course-left">
        <span class="course-code">${course.subject} ${course.number}</span>
        <span class="course-name">${course.title}</span>
      </div>
      <span class="course-credits">${course.credits} cr.</span>
      ${course.completed
        ? '<span class="badge-done">&#10003; Done</span>'
        : '<span class="badge-progress">&#9679; In Progress</span>'}
    `;
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => displayCourseDetails(course));
    container.appendChild(card);
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCourses(btn.dataset.filter);
  });
});

// Initial render
renderCourses('all');
