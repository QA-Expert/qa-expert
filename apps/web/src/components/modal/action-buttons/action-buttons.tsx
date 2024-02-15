import { Row } from '@/components/row/row';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Button from '@mui/material/Button/Button';

type Props = {
  confirmButtonName?: string;
  cancelButtonName?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

export function ModalActionButtons({
  confirmButtonName = 'Confirm',
  cancelButtonName = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
  disabled = false,
}: Props) {
  return (
    <Row
      sx={{
        gap: '1rem',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'flex-end',
        padding: '1rem',
      }}
    >
      <LoadingButton
        loading={isLoading}
        variant="contained"
        color="warning"
        onClick={onConfirm}
        disabled={disabled}
      >
        {confirmButtonName}
      </LoadingButton>

      <Button variant="contained" onClick={onCancel} disabled={isLoading}>
        {cancelButtonName}
      </Button>
    </Row>
  );
}
