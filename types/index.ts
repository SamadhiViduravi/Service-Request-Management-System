export type Course = {
  code: string
  title: string
}

export type Student = {
  id: string
  name: string
  enrolledCourses: Course[]
}
