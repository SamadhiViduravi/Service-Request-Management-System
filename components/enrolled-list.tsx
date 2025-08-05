import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Student } from "@/types"

interface EnrolledListProps {
  students: Student[]
}

export function EnrolledList({ students }: EnrolledListProps) {
  return (
    <Card className="w-full bg-blue-500/10 backdrop-blur-sm border-blue-400/30">
      <CardHeader>
        <CardTitle className="text-blue-800">Enrolled Students</CardTitle>
      </CardHeader>
      <CardContent>
        {students.length === 0 ? (
          <p className="text-gray-600">No students enrolled yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-200/50">
                <TableHead className="text-blue-800">Student Name</TableHead>
                <TableHead className="text-blue-800">Enrolled Courses</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="hover:bg-blue-100/50">
                  <TableCell className="font-medium text-blue-700">{student.name}</TableCell>
                  <TableCell className="text-blue-900">
                    {student.enrolledCourses.length > 0
                      ? student.enrolledCourses.map((course) => course.title).join(", ")
                      : "No courses"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
