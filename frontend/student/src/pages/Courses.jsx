import { useEffect, useState } from "react";
import { getCourses } from "../api/Student";
import DetailedCourseCard from "../components/DetailedCourseCard";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        setError("Failed to load courses");
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      {courses.length > 0 ? (
        courses.map((course) => (
          <DetailedCourseCard key={course.id} course={course} />
        ))
      ) : (
        <p className="text-gray-500">No courses found.</p>
      )}
    </div>
  );
};

export default Courses;
