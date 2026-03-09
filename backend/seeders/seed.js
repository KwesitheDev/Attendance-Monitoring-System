const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Department = require("../models/Department");
const Course = require("../models/Course");
const Session = require("../models/Session");
const Attendance = require("../models/Attendance");
const AuditLog = require("../models/AuditLog");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected for seeding");
    await seed();
  })
  .catch((err) => console.log(err));

const seed = async () => {
  try {
    // Clear all collections
    await User.deleteMany();
    await Department.deleteMany();
    await Course.deleteMany();
    await Session.deleteMany();
    await Attendance.deleteMany();
    await AuditLog.deleteMany();

    // Create Departments
    const departments = await Department.insertMany([
      { name: "Computer Science", code: "CS" },
      { name: "Mathematics", code: "MTH" },
      { name: "Physics", code: "PHY" },
      { name: "Engineering", code: "ENG" },
      { name: "Business", code: "BUS" },
    ]);

    console.log("✓ Departments created");

    // Create Users
    const users = await User.insertMany([
      // Admin Users
      {
        name: "Admin User",
        code: "ADM001",
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
        department: departments[0]._id,
      },
      // Lecturers
      {
        name: "Dr. John Doe",
        code: "LEC001",
        email: "john.doe@example.com",
        password: await bcrypt.hash("lecturer123", 10),
        role: "lecturer",
        department: departments[0]._id,
      },
      {
        name: "Prof. Jane Smith",
        code: "LEC002",
        email: "jane.smith@example.com",
        password: await bcrypt.hash("lecturer123", 10),
        role: "lecturer",
        department: departments[1]._id,
      },
      {
        name: "Dr. Alex Brown",
        code: "LEC003",
        email: "alex.brown@example.com",
        password: await bcrypt.hash("lecturer123", 10),
        role: "lecturer",
        department: departments[2]._id,
      },
      {
        name: "Dr. Sarah Johnson",
        code: "LEC004",
        email: "sarah.johnson@example.com",
        password: await bcrypt.hash("lecturer123", 10),
        role: "lecturer",
        department: departments[3]._id,
      },
      // Students
      {
        name: "Alice Williams",
        code: "STU001",
        email: "alice.williams@example.com",
        password: await bcrypt.hash("student123", 10),
        role: "student",
        department: departments[0]._id,
        year: 2,
      },
      {
        name: "Bob Taylor",
        code: "STU002",
        email: "bob.taylor@example.com",
        password: await bcrypt.hash("student123", 10),
        role: "student",
        department: departments[0]._id,
        year: 2,
      },
      {
        name: "Carol Martinez",
        code: "STU003",
        email: "carol.martinez@example.com",
        password: await bcrypt.hash("student123", 10),
        role: "student",
        department: departments[0]._id,
        year: 2,
      },
      {
        name: "David Chen",
        code: "STU004",
        email: "david.chen@example.com",
        password: await bcrypt.hash("student123", 10),
        role: "student",
        department: departments[1]._id,
        year: 2,
      },
      {
        name: "Emma Davis",
        code: "STU005",
        email: "emma.davis@example.com",
        password: await bcrypt.hash("student123", 10),
        role: "student",
        department: departments[1]._id,
        year: 2,
      },
      {
        name: "Frank Wilson",
        code: "STU006",
        email: "frank.wilson@example.com",
        password: await bcrypt.hash("student123", 10),
        role: "student",
        department: departments[2]._id,
        year: 2,
      },
      {
        name: "Grace Lee",
        code: "STU007",
        email: "grace.lee@example.com",
        password: await bcrypt.hash("student123", 10),
        role: "student",
        department: departments[2]._id,
        year: 2,
      },
      {
        name: "Henry Harris",
        code: "STU008",
        email: "henry.harris@example.com",
        password: await bcrypt.hash("student123", 10),
        role: "student",
        department: departments[3]._id,
        year: 2,
      },
    ]);

    console.log("✓ Users created");

    // Extract lecturers and students for easier reference
    const lecturers = users.filter((u) => u.role === "lecturer");
    const students = users.filter((u) => u.role === "student");

    // Create Courses
    const coursesList = [
      {
        name: "Data Structures",
        code: "CSC201",
        year: 2,
        department: departments[0]._id,
        lecturer: lecturers[0]._id,
        students: [students[0]._id, students[1]._id, students[2]._id],
      },
      {
        name: "Web Development",
        code: "CSC301",
        year: 3,
        department: departments[0]._id,
        lecturer: lecturers[0]._id,
        students: [students[0]._id, students[1]._id],
      },
      {
        name: "Linear Algebra",
        code: "MTH203",
        year: 2,
        department: departments[1]._id,
        lecturer: lecturers[1]._id,
        students: [students[3]._id, students[4]._id],
      },
      {
        name: "Calculus I",
        code: "MTH101",
        year: 1,
        department: departments[1]._id,
        lecturer: lecturers[1]._id,
        students: [
          students[0]._id,
          students[1]._id,
          students[3]._id,
          students[4]._id,
        ],
      },
      {
        name: "Electromagnetism",
        code: "PHY205",
        year: 2,
        department: departments[2]._id,
        lecturer: lecturers[2]._id,
        students: [students[5]._id, students[6]._id],
      },
      {
        name: "Mechanics",
        code: "PHY101",
        year: 1,
        department: departments[2]._id,
        lecturer: lecturers[2]._id,
        students: [
          students[5]._id,
          students[6]._id,
          students[2]._id,
          students[1]._id,
        ],
      },
      {
        name: "Circuit Analysis",
        code: "ENG202",
        year: 2,
        department: departments[3]._id,
        lecturer: lecturers[3]._id,
        students: [students[7]._id],
      },
      {
        name: "Thermodynamics",
        code: "ENG301",
        year: 3,
        department: departments[3]._id,
        lecturer: lecturers[3]._id,
        students: [students[7]._id],
      },
    ];

    const courses = await Course.insertMany(coursesList);
    console.log("✓ Courses created");

    // Create Sessions and Attendance records
    for (const course of courses) {
      // Create 5 sessions for each course, spread over the past month
      for (let i = 0; i < 5; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (4 - i) * 3); // Sessions 12, 9, 6, 3 days ago and today
        date.setHours(10, 0, 0, 0);

        const expiresAt = new Date(date);
        expiresAt.setDate(expiresAt.getDate() + 1);

        const session = await Session.create({
          course: course._id,
          date,
          expiresAt,
        });

        // Create attendance records for 70-90% of enrolled students
        const enrolledStudents = course.students;
        const attendanceCount = Math.ceil(enrolledStudents.length * 0.8);
        const shuffledStudents = [...enrolledStudents].sort(
          () => 0.5 - Math.random(),
        );
        const attendingStudents = shuffledStudents.slice(0, attendanceCount);

        for (const studentId of attendingStudents) {
          await Attendance.create({
            course: course._id,
            student: studentId,
            session: session._id,
          });
        }
      }
    }

    console.log("✓ Sessions and Attendance created");

    // Set enrollment passwords for courses
    for (const course of courses) {
      const enrollmentKey = `enroll${course.code.toLowerCase()}`;
      course.enrollmentPassword = await bcrypt.hash(enrollmentKey, 10);
      await course.save();
    }

    console.log("✓ Enrollment keys set");

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};
