import React, { useState } from 'react';
import CourseList from './components/CourseList.jsx';
import EnrollForm from './components/EnrollForm.jsx';
import EnrolledList from './components/EnrolledList.jsx';

const App = () => {
    const [courses] = useState([
        { code: 'CS101', title: 'Introduction to Programming' },
        { code: 'MATH201', title: 'Calculus I' },
        { code: 'ENG301', title: 'English Literature' },
    ]);
    const [enrollments, setEnrollments] = useState([]);

    const handleEnroll = (studentName, courseCode) => {
        const course = courses.find(c => c.code === courseCode);
        if (course) {
            setEnrollments([...enrollments, { studentName, course }]);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl text-white font-bold text-center mb-6">Student Course Enrollment</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 shadow-lg">
                    <CourseList courses={courses} />
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 shadow-lg">
                    <EnrollForm courses={courses} onEnroll={handleEnroll} />
                </div>
            </div>
            <div className="mt-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 shadow-lg">
                <EnrolledList enrollments={enrollments} />
            </div>
        </div>
    );
};

export default App;