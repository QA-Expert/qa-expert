import { AlertColor } from '@mui/material/Alert';
import { atom } from 'jotai';
import { User } from './__generated__/graphql';

export interface Toast {
  message: string;
  color: AlertColor;
}

export const userAtom = atom<User | null>(null);

export const toastsAtom = atom<Toast[]>([]);
