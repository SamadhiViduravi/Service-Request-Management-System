"use client"

import { useState } from "react"
import { CourseList } from "@/components/course-list"
import { EnrollForm } from "@/components/enroll-form"
import { EnrolledList } from "@/components/enrolled-list"
import type { Course, Student } from "@/types"
import { toast } from "@/hooks/use-toast"

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([
    { code: "CS101", title: "Introduction to Computer Science" },
    { code: "MA201", title: "Calculus I" },
    { code: "PH101", title: "Introduction to Philosophy" },
    { code: "HI305", title: "World History II" },
  ])
  const [students, setStudents] = useState<Student[]>([])
  const [nextStudentId, setNextStudentId] = useState(1)

  const handleEnroll = (studentName: string, courseCode: string) => {
    const courseToEnroll = courses.find((c) => c.code === courseCode)
    if (!courseToEnroll) {
      toast({
        title: "Error",
        description: "Selected course not found.",
        variant: "destructive",
      })
      return
    }

    setStudents((prevStudents) => {
      const existingStudent = prevStudents.find((s) => s.name.toLowerCase() === studentName.toLowerCase())

      if (existingStudent) {
        // Check if already enrolled in this course
        if (existingStudent.enrolledCourses.some((c) => c.code === courseCode)) {
          toast({
            title: "Already Enrolled",
            description: `${studentName} is already enrolled in ${courseToEnroll.title}.`,
            variant: "default",
          })
          return prevStudents
        }
        // Enroll existing student in new course
        const updatedStudents = prevStudents.map((s) =>
          s.id === existingStudent?.id ? { ...s, enrolledCourses: [...s.enrolledCourses, courseToEnroll] } : s,
        )
        toast({
          title: "Enrollment Successful",
          description: `${studentName} enrolled in ${courseToEnroll.title}.`,
        })
        return updatedStudents
      } else {
        // Create new student and enroll
        const newStudent: Student = {
          id: `S${String(nextStudentId).padStart(3, "0")}`,
          name: studentName,
          enrolledCourses: [courseToEnroll],
        }
        setNextStudentId((prevId) => prevId + 1)
        toast({
          title: "Enrollment Successful",
          description: `${studentName} enrolled in ${courseToEnroll.title}.`,
        })
        return [...prevStudents, newStudent]
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <main className="container mx-auto grid gap-8 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 drop-shadow-md">
          Student Course Enrollment System
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CourseList courses={courses} />
          <EnrollForm courses={courses} onEnroll={handleEnroll} />
        </div>

        <EnrolledList students={students} />
      </main>
    </div>
  )
}
