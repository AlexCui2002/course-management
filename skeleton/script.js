//show navigation item
//const navItem = document.querySelector('nav ul li');
const dropdown = document.querySelector('.dropdown');
dropdown.parentNode.addEventListener('mouseover', () => {
  dropdown.style.display = 'block';
});
dropdown.parentNode.addEventListener('mouseleave', () => {
  dropdown.style.display = 'none';
});

//add hover effect
const navItems = document.querySelectorAll('nav ul li');
// navItems.forEach(item => {
//   item.addEventListener('mouseover', () => {
//     item.children[0].style.backgroundColor = 'blue';
//   });
//   item.addEventListener('mouseleave', () => {
//     item.children[0].style.backgroundColor = '';
//   });
// });

// add click effect to nav items
const coursesSection = document.querySelector('#courses-section');
const mgtSection = document.querySelector('#management-section');

navItems[0].addEventListener('click', () => {
  coursesSection.style.display = 'block';
  mgtSection.style.display = 'none';
});
navItems[1].addEventListener('click', () => {
  mgtSection.style.display = 'block';
  coursesSection.style.display = 'none';
});

//create course
const createBtn = document.querySelector('.create-button');
const closeBtn = document.querySelector('.modal .close-button');
const modal = document.querySelector('.modal');

createBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

let courses = [];
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let data = new FormData(e.target);

  const course = {
    id: Date.now(),
    courseName: data.get('course-name'),
    category: data.get('course-category'),
    description: data.get('course-description')
  }

  console.log(course);
  courses.push(course);
  localStorage.setItem('courses', JSON.stringify(courses));

  form.reset();
  renderMgtCourse(course);

  modal.style.display = 'none';
});

function renderMgtCourse(course) {
  const courseList = document.querySelector('.management-list');

  const item = document.createElement('li');
  item.dataset.id = course.id;
  item.innerHTML = `
    <div class="course-info">
      <span class="course-name">${course.courseName}</span>
      <span class="course-description">${course.description}</span>
    </div>
    <button>Delete</button>
  `;

  courseList.appendChild(item);
}

//delete course (event delegation)
const courseList = document.querySelector('.management-list');
courseList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    let item = e.target.parentNode;
    let index = courses.findIndex(course => course.id === item.dataset.id);
    courses.splice(index, 1);
    localStorage.setItem('courses', JSON.stringify(courses));

    item.remove();
  }
})

//whenever load the mgt page, rerender all course based on the local storage
function loadCourses() {
  let data = localStorage.getItem('courses');
  courses = [];
  if (data) {
    courses.push(...JSON.parse(data));
  }
}

navItems[1].addEventListener('click', () => {
  courseList.innerHTML = '';

  courses.forEach(course => {
    renderMgtCourse(course);
  })
});

//display course page
function renderCourseList(filter) {
  const table = document.querySelector('.data-table tbody');

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
  renderCourseList();
});

navItems[0].addEventListener('click', () => {
  renderCourseList();
})

//filter (event propogation)
const dropdownItems = document.querySelectorAll('.dropdown a');
console.log(dropdownItems);
dropdownItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    renderCourseList(item.innerText);
  })
})

//type-ahead search
const search = document.querySelector('#search-bar');
const suggestions = document.querySelector('.suggestion');

search.addEventListener('keyup', () => {
  let term = search.value;

  if (!term || term.trim() === '') {
    suggestions.style.display = 'none';
    return;
  }

  let result = courses.filter(course => 
    course.courseName.toLowerCase()
    .includes(term.toLowerCase()));

  displayResults(result);
});

function displayResults(results) {
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