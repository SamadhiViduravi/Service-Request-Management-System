import CourseList from "@/components/course-list"
import EnrollForm from "@/components/enroll-form"
import EnrolledList from "@/components/enrolled-list"
import { EnrollmentProvider } from "@/context/enrollment-context"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <EnrollmentProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 drop-shadow-md">Student Course Enrollment System</h1>
          <p className="text-lg text-blue-700 mt-2">Manage courses and student enrollments with ease.</p>
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="lg:col-span-1">
            <CourseList />
          </div>
          <div className="lg:col-span-1">
            <EnrollForm />
          </div>
          <div className="lg:col-span-1">
            <EnrolledList />
          </div>
        </main>
      </div>
      <Toaster />
    </EnrollmentProvider>
  )
}
