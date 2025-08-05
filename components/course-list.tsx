import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEnrollment } from "@/context/enrollment-context"

export default function CourseList() {
  const { courses } = useEnrollment()

  return (
    <Card className="w-full bg-blue-500/10 backdrop-blur-sm border-blue-400">
      <CardHeader>
        <CardTitle className="text-blue-800">Available Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {courses.map((course) => (
            <div
              key={course.code}
              className="flex justify-between items-center p-3 rounded-md bg-blue-100/50 border border-blue-200"
            >
              <span className="font-medium text-blue-700">{course.title}</span>
              <span className="text-sm text-blue-600">{course.code}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
