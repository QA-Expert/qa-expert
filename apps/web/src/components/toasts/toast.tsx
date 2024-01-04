'use client';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { cloneDeep } from 'lodash';
import { useReactiveVar } from '@apollo/client';
import { toastErrors } from 'apollo/store';

export const Toasts = () => {
  const toasts = useReactiveVar(toastErrors);
  const setToasts = toastErrors;

  if (!toasts.length) {
    return null;
  }

  const handleClose =
    (index: number) =>
    (_event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      const newToasts = cloneDeep(toasts);

      newToasts.splice(index, 1);

      setToasts(newToasts);
    };

  return (
    <>
      {toasts.map((toast, i) => (
        <Snackbar
          key={i}
          // NOTE: offset if we have multiple toasts
          sx={{ top: `${(i + 1) * 3.5}rem` }}
          open={Boolean(toast)}
          autoHideDuration={10000}
          onClose={handleClose(i)}
        >
          <Alert
            onClose={handleClose(i)}
            severity={toast.color}
            sx={{ width: '100%' }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};
