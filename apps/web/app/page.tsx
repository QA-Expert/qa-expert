import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { Box } from '../src/components/box/box';
import Layout from '../src/components/layout/layout';

const HomePage = () => {
  return (
    <Layout>
      <Box sx={{ gap: '3rem' }}>
        <Typography variant="h1">Main Page</Typography>
        <Link href={'/courses'}>
          <Button variant="contained">Go To Courses</Button>
        </Link>
      </Box>
    </Layout>
  );
};

export default HomePage;
