import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CourseService {
    private Map<String, Course> courses;

    public CourseService() {
        this.courses = new HashMap<>();
    }

    public void addCourse(String code, String title) {
        Course course = new Course(code, title);
        courses.put(code, course);
    }

    public Course getCourse(String code) {
        return courses.get(code);
    }

    public List<Course> getAllCourses() {
        return new ArrayList<>(courses.values());
    }
}