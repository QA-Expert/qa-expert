import { useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';
import { Toast, toastsAtom } from '../src/store';

export const useError = (messages: (string | undefined)[]) => {
  const setToasts = useUpdateAtom(toastsAtom);

  useEffect(() => {
    if (messages?.length) {
      const toasts = messages
        .filter((message): message is string => Boolean(message))
        .map<Toast>((message) => ({
          message,
          color: 'error',
        }));

      setToasts(toasts);
    }

    return () => {
      setToasts([]);
    };
  }, [messages, setToasts]);
};
