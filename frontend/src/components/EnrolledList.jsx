import React from 'react';

const EnrolledList = ({ enrollments }) => {
    return (
        <div>
            <h2 className="text-xl text-white font-semibold mb-2">Enrolled Students</h2>
            {enrollments.length === 0 ? (
                <p className="text-white">No enrollments yet.</p>
            ) : (
                <ul className="list-disc pl-5 text-white">
                    {enrollments.map((enrollment, index) => (
                        <li key={index}>
                            {enrollment.studentName} - {enrollment.course.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EnrolledList;