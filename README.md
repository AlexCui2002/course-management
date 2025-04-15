# Course Management
## 1. Course Data
- There are fixed course category, which are
  - Full Stack
  - Frontend
  - Backend
  - Data Engineer
- The user should only be able to create course with above categories
- The course should have the following structure
  ```
    {
      "id": 1,
      "courseName": "Java Full Stack for beginners",
      "category": "Full Stack",
      "description": "This course is designed to help beginners to learn more about web development"
    }
  ```
## 2. Load Data
- There is no courses available when starting the application. But after the user create any courses, the data should be persisted
- If there are any data available, then the system should load the data when starting up
## 3. Navigation Bar
- Build a navigation bar with following items
  - Courses (A dropdown list)
  - Management
- The default page should be courses data table
### Courses tab
- When clicking, it should show the courses data table
- It should serve as a filter on the courses
  - If the user clicks on the overall courses link, then the courses page should show all available courses
  - If the user clicks on specific course category, then the courses page should only show courses with the selected category
### Management tab
- When clicking, it should show the a list of courses and a create and delete button for creating and deleting courses
### Hover-over Effects
- When hovering over the navigation items, show a hovering-over effects
## 4. Course Data Table
- The course data table should including 3 columns
  - Course Name
  - Category
  - Description
## 5. Type-ahead search
- We should support type-ahead search on course names
## 6. Management
- When clicking on create course button, we should show a modal to allow user to create a course.
  - All fields are mandatory
- When clicking on Delete button, a confirmation box should be display to ask the user if they want to delete it or not