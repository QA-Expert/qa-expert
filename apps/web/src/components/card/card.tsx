import Link from 'next/link';
import { CourseProps, CardContainer } from './card-container';

export function Card(props: CourseProps) {
  // TODO: Better way to figure out if user is Logged in
  // We need to look into cookie for access_token and validate it on UI as well
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
