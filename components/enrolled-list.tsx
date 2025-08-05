import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEnrollment } from "@/context/enrollment-context"

export default function EnrolledList() {
  const { enrolledStudents } = useEnrollment()

  return (
    <Card className="w-full bg-blue-500/10 backdrop-blur-sm border-blue-400">
      <CardHeader>
        <CardTitle className="text-blue-800">Enrolled Students</CardTitle>
      </CardHeader>
      <CardContent>
        {enrolledStudents.length === 0 ? (
          <p className="text-blue-700 italic">No students enrolled yet.</p>
        ) : (
          <div className="grid gap-4">
            {enrolledStudents.map((enrollment) => (
              <div key={enrollment.id} className="flex flex-col p-3 rounded-md bg-blue-100/50 border border-blue-200">
                <span className="font-medium text-blue-700">{enrollment.studentName}</span>
                <span className="text-sm text-blue-600">
                  {enrollment.courseTitle} ({enrollment.courseCode})
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
