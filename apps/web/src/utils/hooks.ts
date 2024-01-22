'use client';

import { RefObject, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Toast, selectedCourseId, toastErrors } from 'apollo/store';
import { getSelectedCourseId } from './url';

export const useError = (messages: (string | undefined)[]) => {
  const setToasts = toastErrors;

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

    global.window.addEventListener('resize', handleWindowResize);

    return () => {
      global.window.removeEventListener('resize', handleWindowResize);
    };
  }, [ref]);

  return width;
};

export const useSelectedCourseId = () => {
  useEffect(() => {
    const hash = global.window?.location?.hash;

    if (hash) {
      const idFromHash = getSelectedCourseId(hash);

      selectedCourseId(idFromHash);
    }
  }, []);
};
