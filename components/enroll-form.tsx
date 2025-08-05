"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Course } from "@/types"
import { toast } from "@/hooks/use-toast"

interface EnrollFormProps {
  courses: Course[]
  onEnroll: (studentName: string, courseCode: string) => void
}

export function EnrollForm({ courses, onEnroll }: EnrollFormProps) {
  const [studentName, setStudentName] = useState("")
  const [selectedCourseCode, setSelectedCourseCode] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentName.trim() || !selectedCourseCode) {
      toast({
        title: "Missing Information",
        description: "Please enter student name and select a course.",
        variant: "destructive",
      })
      return
    }
    onEnroll(studentName.trim(), selectedCourseCode)
    setStudentName("")
    setSelectedCourseCode("")
  }

  return (
    <Card className="w-full bg-blue-500/10 backdrop-blur-sm border-blue-400/30">
      <CardHeader>
        <CardTitle className="text-blue-800">Enroll Student</CardTitle>
        <CardDescription className="text-blue-700/80">Enroll a student into an available course.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="studentName" className="text-blue-900">
              Student Name
            </Label>
            <Input
              id="studentName"
              placeholder="John Doe"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="bg-blue-50/50 border-blue-300 text-blue-950 placeholder:text-blue-400"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="course" className="text-blue-900">
              Course
            </Label>
            <Select value={selectedCourseCode} onValueChange={setSelectedCourseCode}>
              <SelectTrigger id="course" className="bg-blue-50/50 border-blue-300 text-blue-950">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent className="bg-white/90 backdrop-blur-sm">
                {courses.map((course) => (
                  <SelectItem key={course.code} value={course.code}>
                    {course.title} ({course.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Enroll
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
