import React from 'react';

const CourseList = ({ courses }) => {
    return (
        <div>
            <h2 className="text-xl text-white font-semibold mb-2">Available Courses</h2>
            <ul className="list-disc pl-5 text-white">
                {courses.map(course => (
                    <li key={course.code}>{course.code}: {course.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;