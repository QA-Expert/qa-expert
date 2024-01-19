import { Skeletons } from '@/components/skeleton/skeleton';

export default function Loading() {
  return (
    <>
      <Skeletons width={396} height={'100%'} />
      <Skeletons sx={{ flex: 1, height: '100%' }} />
    </>
  );
}
