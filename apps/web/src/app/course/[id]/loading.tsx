import Skeleton from '@mui/material/Skeleton/Skeleton';

export default function Loading() {
  return (
    <>
      <Skeleton
        variant="rounded"
        sx={{ width: 396, height: '100%', borderRadius: '0.75rem' }}
      />
      <Skeleton
        variant="rounded"
        sx={{ flex: 1, height: '100%', borderRadius: '0.75rem' }}
      />
    </>
  );
}
