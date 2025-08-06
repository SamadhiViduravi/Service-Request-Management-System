import java.util.ArrayList;
import java.util.List;

public class EnrollmentSystem {
    private CourseService courseService;
    private List<Student> students;

    public EnrollmentSystem() {
        this.courseService = new CourseService();
        this.students = new ArrayList<>();
    }

    public void addCourse(String code, String title) {
        courseService.addCourse(code, title);
    }

    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    public void enrollStudent(String studentName, String courseCode) {
        Course course = courseService.getCourse(courseCode);
        if (course != null) {
            Student student = findStudent(studentName);
            if (student == null) {
                student = new Student(studentName);
                students.add(student);
            }
            student.enrollCourse(course);
            System.out.println(studentName + " enrolled in " + course.getTitle());
        } else {
            System.out.println("Course not found: " + courseCode);
        }
    }

    public List<Student> getAllStudents() {
        return students;
    }

    private Student findStudent(String name) {
        for (Student student : students) {
            if (student.getName().equals(name)) {
                return student;
            }
        }
        return null;
    }
}