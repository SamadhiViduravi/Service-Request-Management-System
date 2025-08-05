"use client"

import { createContext, useState, useContext, type ReactNode, useCallback } from "react"
import type { Course, StudentEnrollment } from "@/types"

interface EnrollmentContextType {
  courses: Course[]
  enrolledStudents: StudentEnrollment[]
  enrollStudent: (studentName: string, courseCode: string) => boolean
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined)

export const EnrollmentProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>([
    { code: "CS101", title: "Introduction to Computer Science" },
    { code: "MA201", title: "Calculus I" },
    { code: "PH101", title: "Introduction to Philosophy" },
    { code: "HI305", title: "World History II" },
  ])

  const [enrolledStudents, setEnrolledStudents] = useState<StudentEnrollment[]>([])

  const enrollStudent = useCallback(
    (studentName: string, courseCode: string): boolean => {
      const course = courses.find((c) => c.code === courseCode)
      if (course) {
        const newEnrollment: StudentEnrollment = {
          id: `${studentName}-${courseCode}-${Date.now()}`,
          studentName,
          courseCode,
          courseTitle: course.title,
        }
        setEnrolledStudents((prev) => [...prev, newEnrollment])
        return true
      }
      return false
    },
    [courses],
  )

  return (
    <EnrollmentContext.Provider value={{ courses, enrolledStudents, enrollStudent }}>
      {children}
    </EnrollmentContext.Provider>
  )
}

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext)
  if (context === undefined) {
    throw new Error("useEnrollment must be used within an EnrollmentProvider")
  }
  return context
}
