'use client';

import { Box } from '@/components/box/box';
import { Button, List, ListItem, Typography } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { useReactiveVar } from '@apollo/client';
import { isAuthenticated } from 'apollo/store';

const SUBSCRIPTION = {
  amount: '$30',
  access: '3 Months Access',
  features: [
    'Lorem ipsum dolor sit amet, consectetur adipisicing eli',
    'Lorem ipsum dolor sit amet, consectetur adipisicing eli',
    'Lorem ipsum dolor sit amet, consectetur adipisicing eli',
  ],
} as const;

export function Subscription() {
  const isUserAuthenticated = useReactiveVar(isAuthenticated);

  return (
    <Box sx={{ gap: '2rem' }}>
      <Typography
        variant="h3"
        color="success.main"
        fontWeight={800}
        fontSize={'4rem'}
      >
        {SUBSCRIPTION.amount}
      </Typography>
      <Typography
        variant="h4"
        color="success.main"
        sx={{ textTransform: 'uppercase' }}
      >
        {SUBSCRIPTION.access}
      </Typography>
      <List>
        {SUBSCRIPTION.features.map((feature, i) => (
          <ListItem key={i}>
            <CheckBoxOutlinedIcon
              sx={{ fontSize: '2rem', marginRight: '1rem' }}
            />{' '}
            {feature}
          </ListItem>
        ))}
      </List>

      {!isUserAuthenticated ? (
        <Button color="warning" variant="contained">
          Login to Subscribe
        </Button>
      ) : null}
    </Box>
  );
}
