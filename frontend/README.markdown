# Student Course Enrollment React Frontend

This is the frontend for the Student Course Enrollment System, built with React and Tailwind CSS. It features a blue-themed UI with transparent elements.

## Setup and Running
1. Open the project in VS Code.
2. Ensure Node.js is installed (version 16 or later).
3. Open a terminal in the `frontend` folder and run:
   ```bash
   npm install
   npm start
   ```
4. Open `http://localhost:5173` in your browser.
5. Features:
   - View available courses
   - Enroll a student (name + course selection)
   - View enrolled students

## File Structure
- `src/App.jsx`: Main app component.
- `src/components/CourseList.jsx`: Displays available courses.
- `src/components/EnrollForm.jsx`: Form for enrolling students.
- `src/components/EnrolledList.jsx`: Shows enrolled students.
- `src/index.jsx`: Entry point for React.
- `src/index.css`: Global styles.
- `public/index.html`: HTML template.

## Notes
- Uses static data for courses and enrollments (extendable to connect to a backend API).
- Blue-themed UI with glassmorphism (transparent) effects.