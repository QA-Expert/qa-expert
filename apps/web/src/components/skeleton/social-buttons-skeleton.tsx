import Skeleton from '@mui/material/Skeleton/Skeleton';

export const SocialButtonsSkeleton = ({
  isLoading,
}: {
  isLoading?: boolean;
}) => {
  return isLoading ? (
    <Skeleton
      variant="circular"
      width={50}
      height={50}
      sx={{ margin: '0.5rem' }}
    />
  ) : null;
};
