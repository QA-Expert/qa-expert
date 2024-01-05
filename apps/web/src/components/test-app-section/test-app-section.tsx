import { Section } from '@/components/section/section';
import styled from '@emotion/styled';
import Iframe from 'react-iframe';

export function TestAppSection() {
  return (
    <Section sx={{ flex: 0.75, padding: '1rem' }}>
      <StyledIframe
        url={process.env.NEXT_PUBLIC_TEST_WEB_APP_URL ?? ''}
        width="100%"
        height="100%"
      />
    </Section>
  );
}

const StyledIframe = styled(Iframe)({
  borderRadius: '0.5rem',
  border: 'none',
});
