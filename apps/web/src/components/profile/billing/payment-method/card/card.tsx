import { Card } from '@/components/profile/card/card';
import { Row } from '@/components/row/row';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Typography from '@mui/material/Typography/Typography';
import {
  getBillingAddressString,
  getPaymentMethodInfoString,
} from '../handlers';
import { GetPaymentMethodQuery } from '__generated__/graphql';
import Button from '@mui/material/Button/Button';
import { CardTitle } from '@/components/profile/card/card-title';
import { Box } from '@/components/box/box';

type Props = {
  paymentMethod: GetPaymentMethodQuery['paymentMethod'];
  onUpdate: () => void;
  onRemove: () => void;
  onAdd: () => void;
  removeLoading: boolean;
};

export function PaymentMethodCard({
  onUpdate,
  onRemove,
  paymentMethod,
  removeLoading,
  onAdd,
}: Props) {
  const paymentMethodData = getPaymentMethodInfoString(paymentMethod);
  const billingAddress = getBillingAddressString(paymentMethod);

  return (
    <Card
      sx={{
        width: '350px',
        padding: '2rem',
        minHeight: '350px',
      }}
    >
      <CardTitle>Payment Method Information</CardTitle>

      <Box sx={{ flex: 1, alignItems: 'flex-start' }}>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
          }}
        >
          Full name: {paymentMethod?.fullName ?? '--'}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
          }}
        >
          Payment Method: {paymentMethodData}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
          }}
        >
          Billing Address: {billingAddress}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
          }}
        >
          Phone: {paymentMethod?.phone ?? '--'}
        </Typography>
      </Box>

      <Row
        sx={{
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        {paymentMethod ? (
          <>
            <Button variant="contained" onClick={onUpdate}>
              update
            </Button>

            <LoadingButton
              variant="outlined"
              color="error"
              loading={removeLoading}
              onClick={onRemove}
            >
              Remove
            </LoadingButton>
          </>
        ) : (
          <Button variant="contained" onClick={onAdd}>
            Add
          </Button>
        )}
      </Row>
    </Card>
  );
}
