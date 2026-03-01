export interface ClassSchedule {
  day: string;       
  startTime: string; 
  endTime: string;   
  courseId: number;
}

export const TIMETABLE: ClassSchedule[] = [];

import { COURSES } from './courses';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

COURSES.forEach((course, index) => {
  days.forEach((day, i) => {
    if (i % 2 === 0) {
      TIMETABLE.push({
        day,
        startTime: '10:00 AM',
        endTime: '12:30 PM',
        courseId: course.id,
      });
      TIMETABLE.push({
        day,
        startTime: '2:30 PM',
        endTime: '5:00 PM',
        courseId: course.id,
      });
    }
  });
});