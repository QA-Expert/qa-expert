import { Typography } from '@mui/material';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip/Tooltip';
import Link from 'next/link';
import { Box } from '@/components/box/box';
import MuiLink from '@mui/material/Link';
import { cloneElement } from 'react';

export function PreReleaseOverlay(props: Omit<TooltipProps, 'title'>) {
  return (
    <>
      {process.env.NEXT_PUBLIC_IS_PRE_RELEASE === 'true' ? (
        <Tooltip
          {...props}
          title={
            <Box sx={{ padding: '1rem' }}>
              <Typography sx={{ fontSize: '1rem' }}>Coming soon</Typography>
              <MuiLink
                href="mailto:info@qaexpert.io"
                component={Link}
                sx={{ fontSize: '1rem' }}
              >
                Send Us email
              </MuiLink>
            </Box>
          }
        >
          <span>
            <span style={{ pointerEvents: 'none' }}>
              {cloneElement(props.children, {
                disabled: true,
              })}
            </span>
          </span>
        </Tooltip>
      ) : (
        props.children
      )}
    </>
  );
}
