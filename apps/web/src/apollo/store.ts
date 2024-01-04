import { makeVar } from '@apollo/client';
import { AlertColor } from '@mui/material/Alert';

export interface Toast {
  message: string;
  color: AlertColor;
}

export const isAuthenticated = makeVar(false);
export const toastErrors = makeVar<Toast[]>([]);
