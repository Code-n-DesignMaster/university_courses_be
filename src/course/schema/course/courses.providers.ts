import { Connection } from 'mongoose';
import { CourseSchema } from './course.schema';

export const coursesProviders = [
  {
    provide: 'COURSE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Course', CourseSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
