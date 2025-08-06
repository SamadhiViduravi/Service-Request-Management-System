import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        EnrollmentSystem system = new EnrollmentSystem();
        system.addCourse("CS101", "Introduction to Programming");
        system.addCourse("MATH201", "Calculus I");
        system.addCourse("ENG301", "English Literature");

        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("\n1. View Courses\n2. Enroll Student\n3. View Enrolled Students\n4. Exit");
            System.out.print("Choose an option: ");
            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            if (choice == 1) {
                System.out.println("Available Courses:");
                for (Course course : system.getAllCourses()) {
                    System.out.println(course.getCode() + ": " + course.getTitle());
                }
            } else if (choice == 2) {
                System.out.print("Enter student name: ");
                String name = scanner.nextLine();
                System.out.print("Enter course code: ");
                String code = scanner.nextLine();
                system.enrollStudent(name, code);
            } else if (choice == 3) {
                System.out.println("Enrolled Students:");
                for (Student student : system.getAllStudents()) {
                    System.out.println("Student: " + student.getName());
                    for (Course course : student.getEnrolledCourses()) {
                        System.out.println(" - " + course.getTitle());
                    }
                }
            } else if (choice == 4) {
                break;
            }
        }
        scanner.close();
    }
}