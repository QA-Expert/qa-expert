import Skeleton from '@mui/material/Skeleton/Skeleton';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  const numberOfSkeletons = 10;

  return [...Array(numberOfSkeletons)].map((item) => (
    <Skeleton
      width={420}
      height={320}
      sx={{ borderRadius: '0.75rem' }}
      variant="rounded"
      key={item}
    />
  ));
}
