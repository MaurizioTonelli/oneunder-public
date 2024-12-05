import { Course } from "../types";

export default function TournamentCoursesPool({
  courses,
}: {
  courses?: Course[];
}) {
  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {courses &&
          courses.map((course, i) => (
            <li key={i} className="flex justify-between gap-x-6 py-2">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {course.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {course.alias}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  ID: <span className="font-medium">{course._id}</span>
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Country: {course.country}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
