import { useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';
import { toastMessageAtom } from '../src/store';

export const useError = (message: string | undefined) => {
  const setMessage = useUpdateAtom(toastMessageAtom);

  useEffect(() => {
    if (message) {
      setMessage(message);
    }

    return () => {
      setMessage(null);
    };
  }, [message, setMessage]);
};
