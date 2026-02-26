export const dummyCourses = [
  {
    id: 1,
    code: "CSC201",
    name: "Data Structures & Algorithms",
    lecturer: {
      name: "Dr. John Doe",
      email: "j.doe@university.edu",
    },
    department: "Computer Science",
    semester: "First Semester",
    year: 2,
    schedule: {
      days: ["Monday", "Wednesday"],
      time: "10:00 AM - 12:00 PM",
      venue: "Room B204",
    },
    totalClasses: 28,
    attendedClasses: 23,
    missedClasses: 5,
    attendancePercentage: 82,
    recentSessions: [
      { date: "2026-02-10", status: "Present" },
      { date: "2026-02-12", status: "Absent" },
      { date: "2026-02-17", status: "Present" },
    ],
  },
  {
    id: 2,
    code: "MTH203",
    name: "Linear Algebra",
    lecturer: {
      name: "Prof. Jane Smith",
      email: "j.smith@university.edu",
    },
    department: "Mathematics",
    semester: "First Semester",
    year: 2,
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "2:00 PM - 4:00 PM",
      venue: "Room A101",
    },
    totalClasses: 24,
    attendedClasses: 18,
    missedClasses: 6,
    attendancePercentage: 75,
    recentSessions: [
      { date: "2026-02-11", status: "Present" },
      { date: "2026-02-13", status: "Present" },
      { date: "2026-02-18", status: "Absent" },
    ],
  },
];
