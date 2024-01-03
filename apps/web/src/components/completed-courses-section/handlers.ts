import { CourseProps } from '../../../app/courses/page';

export const getCoursesToShowBySectionWidth = (
  width: number,
  courses: CourseProps[],
) => {
  const remainingCoursesToShow = [...courses];
  const maxNumberOfCardsInCurrentWidth = width
    ? Math.round(width / 250)
    : courses.length;
  const remainingCoursesNumberToShow =
    courses.length - maxNumberOfCardsInCurrentWidth;
  const coursesToShow =
    remainingCoursesNumberToShow < courses.length
      ? remainingCoursesToShow.splice(
          remainingCoursesNumberToShow,
          courses.length - remainingCoursesNumberToShow,
        )
      : [];

  return {
    remainingCoursesToShow,
    coursesToShow,
  };
};
