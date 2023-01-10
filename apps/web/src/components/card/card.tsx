import Link from 'next/link';
import { CourseProps, CardContainer } from './card-container';

export function Card(props: CourseProps) {
  const isUserLoggedInBasedOnProgress = 'progress' in props;

  return isUserLoggedInBasedOnProgress ? (
    <Link href={`/course/${props._id}`}>
      <a>
        <CardContainer {...props} />
      </a>
    </Link>
  ) : (
    <CardContainer {...props} />
  );
}
