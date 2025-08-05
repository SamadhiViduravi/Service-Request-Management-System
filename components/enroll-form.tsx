"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEnrollment } from "@/context/enrollment-context"
import { useToast } from "@/hooks/use-toast"

export default function EnrollForm() {
  const [studentName, setStudentName] = useState("")
  const [selectedCourseCode, setSelectedCourseCode] = useState("")
  const { courses, enrollStudent } = useEnrollment()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentName || !selectedCourseCode) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    const success = enrollStudent(studentName, selectedCourseCode)
    if (success) {
      toast({
        title: "Success",
        description: `${studentName} enrolled in ${selectedCourseCode}.`,
      })
      setStudentName("")
      setSelectedCourseCode("")
    } else {
      toast({
        title: "Error",
        description: "Failed to enroll. Course not found.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full bg-blue-500/10 backdrop-blur-sm border-blue-400">
      <CardHeader>
        <CardTitle className="text-blue-800">Enroll in a Course</CardTitle>
        <CardDescription className="text-blue-700">Fill out the form to enroll a student.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="studentName" className="text-blue-700">
              Student Name
            </Label>
            <Input
              id="studentName"
              placeholder="John Doe"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="bg-blue-50/50 border-blue-300 text-blue-900 placeholder:text-blue-500"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="course" className="text-blue-700">
              Course
            </Label>
            <Select value={selectedCourseCode} onValueChange={setSelectedCourseCode}>
              <SelectTrigger id="course" className="bg-blue-50/50 border-blue-300 text-blue-900">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent className="bg-blue-50 border-blue-300 text-blue-900">
                {courses.map((course) => (
                  <SelectItem key={course.code} value={course.code}>
                    {course.title} ({course.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Enroll Student
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
