import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useAtom } from 'jotai';
import { toastMessageAtom } from '../../store';

export const Toast = () => {
  const [message, setMessage] = useAtom(toastMessageAtom);
  if (!message) {
    return null;
  }

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessage(null);
  };

  return (
    <Snackbar
      sx={{ top: '2rem' }}
      open={Boolean(message)}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
