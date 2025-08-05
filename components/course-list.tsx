import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Course } from "@/types"

interface CourseListProps {
  courses: Course[]
}

export function CourseList({ courses }: CourseListProps) {
  return (
    <Card className="w-full bg-blue-500/10 backdrop-blur-sm border-blue-400/30">
      <CardHeader>
        <CardTitle className="text-blue-800">Available Courses</CardTitle>
      </CardHeader>
      <CardContent>
        {courses.length === 0 ? (
          <p className="text-gray-600">No courses available.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-200/50">
                <TableHead className="w-[100px] text-blue-800">Code</TableHead>
                <TableHead className="text-blue-800">Title</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.code} className="hover:bg-blue-100/50">
                  <TableCell className="font-medium text-blue-700">{course.code}</TableCell>
                  <TableCell className="text-blue-900">{course.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
