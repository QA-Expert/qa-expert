import Skeleton, { SkeletonProps } from '@mui/material/Skeleton/Skeleton';

type Props = SkeletonProps & {
  quantity?: number;
};

export function Skeletons({ quantity = 1, ...props }: Props) {
  return (
    <>
      {[...Array(quantity)].map((item, i) => (
        <Skeleton
          {...props}
          sx={{ ...props.sx, borderRadius: '0.75rem' }}
          variant="rounded"
          key={i}
        />
      ))}
    </>
  );
}
