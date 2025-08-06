import React, { useState } from 'react';

const EnrollForm = ({ courses, onEnroll }) => {
    const [studentName, setStudentName] = useState('');
    const [courseCode, setCourseCode] = useState(courses[0]?.code || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (studentName && courseCode) {
            onEnroll(studentName, courseCode);
            setStudentName('');
        }
    };

    return (
        <div>
            <h2 className="text-xl text-white font-semibold mb-2">Enroll in a Course</h2>
            <div onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-white">Student Name:</label>
                    <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full p-2 rounded bg-white bg-opacity-30 text-white placeholder-gray-300"
                        placeholder="Enter name"
                    />
                </div>
                <div>
                    <label className="block text-white">Course:</label>
                    <select
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        className="w-full p-2 rounded bg-white bg-opacity-30 text-white"
                    >
                        {courses.map(course => (
                            <option key={course.code} value={course.code}>{course.title}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                >
                    Enroll
                </button>
            </div>
        </div>
    );
};

export default EnrollForm;