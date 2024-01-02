'use client';

import { RefObject, useEffect, useState } from 'react';
import { Toast, toastsAtom } from '../src/store';
import { debounce } from 'lodash';
import { useSetAtom } from 'jotai/react';

export const useError = (messages: (string | undefined)[]) => {
  const setToasts = useSetAtom(toastsAtom);

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

export const useWidth = (ref: RefObject<HTMLElement>) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleWindowResize = debounce(() => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }, 300);

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [ref]);

  return width;
};
