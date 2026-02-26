import { dummyCourses } from "../data/dummyCourses";
import DetailedCourseCard from "../components/DetailedCourseCard";

const Courses = () => {
  return (
    <div className="p-6 space-y-6">
      {dummyCourses.map((course) => (
        <DetailedCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Courses;
