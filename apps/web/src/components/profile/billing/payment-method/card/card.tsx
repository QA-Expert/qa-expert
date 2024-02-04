import { Card } from '@/components/profile/card/card';
import { Row } from '@/components/row/row';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Typography from '@mui/material/Typography/Typography';
import { getPaymentMethodInfoString } from '../handlers';
import { GetPaymentMethodQuery } from '__generated__/graphql';
import Button from '@mui/material/Button/Button';

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

  return (
    <Card
      sx={{
        maxWidth: '350px',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: 'secondary.main',
          fontSize: '1rem',
          textTransform: 'uppercase',
        }}
      >
        Payment Method Information
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
        Billing Address: {paymentMethod?.address ?? '--'}
      </Typography>

      <Row
        sx={{
          gap: '1rem',
          justifyContent: 'center',
          flex: 1,
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
