'use client';

import { TimeTableCard } from "../src/components/TimeTableCard";
import { COURSES } from "../src/constants/courses";
import { TIMETABLE } from "../src/constants/timetable";
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function TimetablePage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Weekly Class Timetable
      </h1>

      {COURSES.map((course) => (
        <div key={course.id} className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            {course.title}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {DAYS.map((day) => {
              const dayClasses = TIMETABLE
                .filter(
                  (item) =>
                    item.courseId === course.id && item.day === day
                )
                .slice(0, 2); 

              return (
                <TimeTableCard
                  key={day}
                  day={day}
                  classes={dayClasses.map((cls) => ({
                    name: course.title,
                    time: `${cls.startTime} - ${cls.endTime}`,
                  }))}
                />
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}