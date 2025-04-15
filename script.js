//1. Show Dropdown Menu when hovering over
const dropdown = document.querySelector('.dropdown');
//use mouseover and mouseout events
dropdown.parentNode.addEventListener('mouseover', () => {
  dropdown.style.display = 'block';
});
dropdown.parentNode.addEventListener('mouseout', () => {
  dropdown.style.display = 'none';
});

//2. Add hover-over effect to nav bar
const navItems = document.querySelectorAll('nav ul li');
// navItems.forEach(item => {
//   item.addEventListener('mouseover', () => {
//     item.style.backgroundColor = '#0056b3';
//   });
//   item.addEventListener('mouseout', () => {
//     item.style.backgroundColor = '';
//   });
// });
// We should use CSS to style the hover effect instead of JS

//3. Add click effect to nav items
const courseSection = document.querySelector('#courses-section');
const managementSection = document.querySelector('#management-section');
navItems[0].addEventListener('click', () => {
  courseSection.style.display = 'block';
  managementSection.style.display = 'none';
});
navItems[1].addEventListener('click', () => {
  courseSection.style.display = 'none';
  managementSection.style.display = 'block';
});

//4. Create Course Modal
const createBtn = document.querySelector('a.create-button');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-button');

createBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

//5. Add course to course list
let courses = [];
//handle the form submission
const form = document.querySelector('.modal form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let data = new FormData(form);

  const course = {
    id: Date.now(),
    courseName: data.get('course-name'),
    category: data.get('course-category'),
    description: data.get('course-description'),
  };

  console.log(course);

  courses.push(course);
  localStorage.setItem('courses', JSON.stringify(courses));

  form.reset();
  modal.style.display = 'none';
  renderCourse(course);
});

function renderCourse(course) {
  const courseList = document.querySelector('.management-list');

  const courseItem = document.createElement('li');
  courseItem.dataset.id = course.id;
  courseItem.innerHTML = `
    <div class="course-info">
      <span class="course-name">${course.courseName}</span>
      <span class="course-description">${course.description}</span>
    </div>
    <button>Delete</button>
  `;

  courseList.appendChild(courseItem);
}

//6. Delete course from course list (event-delegation)
const courseList = document.querySelector('.management-list');
courseList.addEventListener('click', (e) => {
  let target = e.target;
  if (target.tagName === 'BUTTON') {
    //We also need to remove the course from the courses array
    let courseId = target.parentNode.dataset.id;
    let index = courses.find(course => course.id == courseId);
    courses.splice(index, 1);

    localStorage.setItem('courses', JSON.stringify(courses));

    target.parentNode.remove();
  }
})

//7. load courses from local storage
function loadCourses() {
  let cachedData = localStorage.getItem('courses');
  courses = [];
  if (cachedData) {
    courses.push(...JSON.parse(cachedData));
  }
}

navItems[1].addEventListener('click', () => {  
  //clear the course list before rendering
  const courseList = document.querySelector('.management-list');
  courseList.innerHTML = '';

  courses.forEach(course => {
    renderCourse(course);
  });
});

//8. display course on courses page
function renderCoursesOnCoursePage(filter) {
  const table = document.querySelector('.data-table tbody');

  //clear the table before rendering
  table.innerHTML = '';

  let filteredCourses = courses;
  if (filter) {
    filteredCourses = courses.filter(course => course.category === filter);
  }

  filteredCourses.forEach(course => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${course.courseName}</td>
      <td>${course.category}</td>
      <td>${course.description}</td>
    `;

    table.appendChild(row);
  });
}

window.addEventListener('load', () => {
  loadCourses();
  renderCoursesOnCoursePage();
});

navItems[0].addEventListener('click', () => {
  renderCoursesOnCoursePage();
});

//9. deal with filter options (event propagation)
const dropdownFilters = document.querySelectorAll('.dropdown a');
dropdownFilters.forEach(filter => {
  filter.addEventListener('click', (e) => {
    renderCoursesOnCoursePage(filter.innerHTML);
    e.stopPropagation();
  });
});

//10. type-ahead search
let results = [];
const searchInput = document.querySelector('#search-bar');
const suggestions = document.querySelector('.suggestion');

function displayResults() {
  suggestions.innerHTML = '';
  results.forEach(result => {
    const suggestion = document.createElement('li');
    suggestion.innerHTML = `
        <span>${result.courseName}</span>
        <span>${result.category}</span>
    `;
    suggestions.appendChild(suggestion);
  });
  suggestions.style.display = 'block';
}

searchInput.addEventListener('keyup', (e) => {
  let term = e.target.value;
  if (!term || term.trim() === '') {
    suggestions.style.display = 'none';
    return;
  }

  results = courses.filter(course => {
    return course.courseName.toLowerCase().includes(term.toLowerCase());
  });

  displayResults();
});