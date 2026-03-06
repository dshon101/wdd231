// course.js — Course list display, filtering, and credit totals
// WDD 231 | Demetrious Shoniwa

const courses = [
  { subject: 'CSE', number: 110, title: 'Introduction to Programming',      credits: 2, completed: true  },
  { subject: 'WDD', number: 130, title: 'Web Fundamentals',                  credits: 2, completed: true  },
  { subject: 'CSE', number: 111, title: 'Programming with Functions',        credits: 2, completed: true  },
  { subject: 'CSE', number: 210, title: 'Programming with Classes',          credits: 2, completed: true  },
  { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals',          credits: 2, completed: true  },
  { subject: 'WDD', number: 231, title: 'Frontend Web Development I',        credits: 2, completed: false },
  { subject: 'CSE', number: 212, title: 'Programming with Data Structures',  credits: 2, completed: false },
];

const container     = document.getElementById('course-container');
const creditCount   = document.getElementById('creditCount');
const filterButtons = document.querySelectorAll('.filter-btn');

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
